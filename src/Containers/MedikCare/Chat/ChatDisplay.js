import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import ChatForm from './chatForms';



const ChatDisplay = (props) =>{
     
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    //const chatSession = JSON.parse(sessionStorage.getItem("chatSession"));
    const [messages, setDisplayMessage] = useState([]); 
    const element = useRef(null);

    const scrollToBottom = ()=>{  
        element.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    const updateMessageList=()=>{
        console.log(props.message)
        if(props.message.messageState === true){
            setDisplayMessage(messages => messages.concat({_id:Date.now(), delivery:true, message:props.message.message,createdAt:Date.now(),from:props.session._id}));
            scrollToBottom();
        }
    }
    const fetchChatMessage =()=>{       
        const messageData = {"from":props.session._id, "to":props.to};  
        props.socket.emit("fetch message", messageData);
 
         props.socket.on("fetch message",(dataset, roomSession)=>{
             if (dataset === false && !sessionItemUser) {
                 setDisplayMessage([]);
                 window.location = "/chat/doctors/doctor";
             }else if (dataset === false && !sessionItemDoctor) {
                 setDisplayMessage([]);
                 window.location = "/chat/doctors";
             }else if (dataset === false && !sessionItemUser && !sessionItemDoctor) {
                 window.location = "/";
          }else{
             
            sessionStorage.setItem("chatSession", JSON.stringify({room:roomSession}));
             setDisplayMessage(dataset);
             scrollToBottom();
             }
         })
     }

    const notify = (data,url)=>{
        fetch(url, {
            method:"POST",
            body:JSON.stringify(data),
            headers:{'Content-Type': "application/json", "u-auth":props.session.token}
        })
        .then(res => res.json())
        .then(response =>{
            if(response.status === 401) {
                if(props.session.isUser === false){
                 sessionStorage.removeItem("doctor");
                   window.location = "/doctor/login?Session expired please login.";
                }else if(props.session.isUser === true) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login.";
                }
            }else if(response.status === 200){
                console.log("sent notification")
            }else if (response.status === 403) {
                console.log(response.message);
            }
        })
    }

     
    const getChatMessage=()=>{
        props.socket.on("get message",(dataset)=>{
            if (dataset === false && !sessionItemUser) {
                setDisplayMessage([]);
                window.location = "/chat/doctors/doctor";
            }else if (dataset === false && !sessionItemDoctor) {
               
                setDisplayMessage([]);
                window.location = "/chat/doctors";
         }else if (dataset === false && !sessionItemUser && !sessionItemDoctor) {
                window.location = "/";
         }else{
               let messageData = {"message": dataset.message, "from":props.session._id, "to":props.to}; 
    
               if(sessionItemUser !== null && dataset.from === sessionItemUser._id) {
                console.log("doc")
                notify(messageData, "/api/v1/doctor/notify-doctor");
            }else if( sessionItemDoctor !== null && dataset.from === sessionItemDoctor._id) {
                console.log("user")
                notify(messageData, "/api/v1/user/notify-user");
            }

            setDisplayMessage(messages => messages.concat(dataset));   
            }
            scrollToBottom();
         })
    }


    useEffect(()=>{
        fetchChatMessage();
    }, [])

    useEffect(()=>{
        getChatMessage(); 
        updateMessageList(); 
    }, []);

    const displayMessages = messages.map((message, index)=>{    
        let float;
        let tick;
        let  Color;
        let cardColor;
        let cardBodyColor;  
        let delivery; 
        let name;
            if (message.delivery === true) {
                delivery =  <i className="fa fa-check" aria-hidden="true"></i>
            }else{
                delivery =  <i className="fa fa-check text-dark" aria-hidden="true"></i>
            }

        if (message.from === props.session._id) {
             float = "float-right";
             tick = delivery;
              Color = " medik-color";
             cardColor = "";
             cardBodyColor = "";

        } else{
             float ="float-left";
             tick ="";
              Color = "text-dark";
             cardColor = " b-medik";
             cardBodyColor = "text-white";
        }
           return <div className={float} key={message._id}>
                <div className={"card box-shadow "+cardColor}>
                    <div className={cardBodyColor}>
                        <p className="padding-sm">{message.message}</p>
                    </div>
                </div>
                <i className="date-time"><Moment fromNow>{message.createdAt}</Moment></i>
            </div>

    })
    return(
    <div>
        <div className="top-margin-lg">
            {displayMessages}
            <p className="col-12 row bottom-margin-lg bottom-padding-lg card-body" ref={element}></p>
        </div>
        <ChatForm name={props.name}  to={props.to}/>
    </div>
    )
}

export default ChatDisplay;