import React, {useState, useEffect, useRef} from "react" ;
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import {socket} from '../Socket/Socket';
import ChatForm from "./ChatForm";
 
const Chat =(props)=>{
    const to  = props.match.params.id
 
    let dashboardLink;
    let userUrl;
    let isUserActive;
    let isDoctorActive;
    let sess;
    let msg = "";
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor")); 
    const [messages, setDisplayMessage] = useState([]) 
    const [scroll, setScroll] = useState({id:"scroll"}) 
    const [userDetail,setUserDetail] = useState({});
    const [room, setRoomSession] = useState({roomSession:null});
    const [session, setSession] = useState({});
    const [typingUser, setTypingUser] = useState({value:""})

    const element = useRef(null);
    const textElement = useRef(null);
    const typingRef = useRef("");

    if (sessionItemUser === null && sessionItemDoctor !== null) {
          dashboardLink ="/chat/doctors/doctor";
          userUrl = "/api/v1/doctor/find-user/"+to;
          sess = sessionItemDoctor;
          isDoctorActive = true;
    }else if (sessionItemUser !== null && sessionItemDoctor === null) {
         dashboardLink ="/chat/doctors";
         userUrl = "/api/v1/user/find-doctor/"+to;
         sess = sessionItemUser;
         isUserActive = true;
   }
    const scrollToBottom = ()=>{  
        element.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    const getUserDetailsHandller = ()=>{
        fetch(userUrl, {
            method:"GET",
            headers: {'Content-Type': "application/json", "u-auth":sess.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status ===200) {
                setUserDetail(response.message);
            }else{
                setUserDetail({"name":"user"});
            }
        })
    }

    const notify = (data,url)=>{
        fetch(url, {
            method:"POST",
            body:JSON.stringify(data),
            headers:{'Content-Type': "application/json", "u-auth":sess.token}
        })
        .then(res => res.json())
        .then(response =>{
            if(response.status === 401) {
                if(session.isUser === false){
                 sessionStorage.removeItem("doctor");
                   window.location = "/doctor/login?Session expired please login.";
                }else if(session.isUser === true) {
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
    
    const submitChatMessage=(event)=>{
        event.preventDefault();
        let messageData ={};
        messageData = {"message":textElement.current.value, "from":sess._id, "to":to, "room":room.roomSession};
        textElement.current.value = "";
         socket.emit("send message", messageData);
       setDisplayMessage(messages => messages.concat({_id:Date.now(), delivery:true, message:messageData.message,createdAt:Date.now(),from:sess._id}));
        scrollToBottom();
    }


     
    const fetchChatMessage =()=>{       
       const messageData = {"from":sess._id, "to":to};  
        socket.emit("fetch message", messageData);

        socket.on("fetch message",(dataset, roomSession)=>{
            if (dataset === false && !sessionItemUser) {
                setDisplayMessage([]);
                console.log(session)
                window.location = "/chat/doctors/doctor";
            }else if (dataset === false && !sessionItemDoctor) {
                setDisplayMessage([]);
                console.log(session)
                window.location = "/chat/doctors";
            }else if (dataset === false && !sessionItemUser && !sessionItemDoctor) {
                window.location = "/";
         }else{
            
            setRoomSession({roomSession:roomSession});
            setDisplayMessage(dataset);
            scrollToBottom();
            }
        })
    }

 

    const getChatMessage=()=>{
        socket.on("get message",(dataset)=>{
            if (dataset === false && !sessionItemUser) {
                setDisplayMessage([]);
                window.location = "/chat/doctors/doctor";
            }else if (dataset === false && !sessionItemDoctor) {
               
                setDisplayMessage([]);
                window.location = "/chat/doctors";
         }else if (dataset === false && !sessionItemUser && !sessionItemDoctor) {
                window.location = "/";
         }else{
               let messageData = {"message": dataset.message, "from":sess._id, "to":props.match.params.id}; 
    
               if(sessionItemUser !== null && dataset.from === sessionItemUser._id) {
               // console.log("doc")
                notify(messageData, "/api/v1/doctor/notify-doctor");
            }else if( sessionItemDoctor !== null && dataset.from === sessionItemDoctor._id) {
               // console.log("user")
                notify(messageData, "/api/v1/user/notify-user");
            }

                if (dataset.from !== sess._id) {
                    setDisplayMessage(messages => messages.concat({_id:dataset._id, message:dataset.message, createdAt:dataset.createdAt, from:dataset.from, to:dataset.to}));   
                }
    
            }
            scrollToBottom();
         })
    }

    const whoIsTyping = (event) =>{
        socket.emit('typing', room.roomSession);

        socket.on('typing', (message)=>{
            typingRef.current.value = userDetail.name+" "+message;
            setTypingUser({value:userDetail.name+" "+message})
        })
    }
    const notTyping=(event)=>{
        socket.emit('not typing', room.roomSession);

        socket.on('not typing', message=>{
            setTypingUser({value:""})
        })
    }

const viewProfile= (event, id)=>{
    event.preventDefault();
    if (sessionItemDoctor) {
        window.location = "/chat/user/profile/"+id;
    }else if(sessionItemUser){
        window.location = "/chat/doctor/profile/"+id;
    }
}
    const endSession=(event, id)=>{
        event.preventDefault();
        if (sessionItemDoctor) {
            window.location = "/chat/report/"+id;
        }else if(sessionItemUser){
            window.location = "/chat/feedback/"+id;
        }
    }


    useEffect(()=>{
        getUserDetailsHandller();
        fetchChatMessage();
        getChatMessage();  
        whoIsTyping();
        notTyping();
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

        if (message.from === sess._id) {
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
        <div className="overflow-hidden">
            <div className="container-fluid">
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="card-body">
                                <div className="card  position-fixed fixed-top">
                                    <div className="card-body b-medik text-dark">
                                       <div className="row justify-content-center">
                                           <div className="col-2">
                                               <Link to={dashboardLink}>
                                                <i className="fa fa-arrow-left fa-lg text-white" aria-hidden="false"></i>
                                               
                                                </Link>
                                           </div>
                                           <div className="col-8">
                                           <p className="text-white">{userDetail.name}</p>
                                           </div>
                                            <div className="col-2">
                                                <div className="dropdown dropleft">
                                                    <i className="fa fa-ellipsis-v  fa-3x text-white" aria-hidden="true" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></i>
                                                    <div className="dropdown-menu">
                                                        <div> <span onClick={event => viewProfile(event, props.match.params.id)} className="dropdown-item" href="#">profile</span></div>
                                                        <div className="dropdown-divider"></div>
                                                        <div><a onClick={(event)=>endSession(event, props.match.params.id)} className="dropdown-item" href="#">End Chat</a></div>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Back</a>
                                                    </div>
                                                </div>  
                                            </div>
                                       </div>
                                    </div>
                                </div>
                               <div className="top-margin-lg">
                                   {displayMessages}
                                <p className="col-12 row bottom-margin-lg bottom-padding-lg card-body" ref={element}>click the bell on the right for notification</p>
                               </div>
                                <div className="clearfix bottom-padding-lg top-padding-md" id={scroll.scroll}></div>
                                <div className="card b-medik position-fixed  chat-static-buttom">
                                   <div className="card-body">
                                        <div className="text-white" ref={typingRef} value="www"/>
                                        <i className="text-white">{typingUser.value}</i>
                                        <form onSubmit={submitChatMessage}>
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="form-group"> 
                                                        <textarea name="chat" onKeyUp={event=>notTyping(event)} onKeyPress={event=>whoIsTyping(event)} ref={textElement} className="form-control chat-message" placeholder="Write a message" rows="1" required></textarea>
                                                        </div>
                                                </div>
                                                <div className="col-4">
                                                    <input type="submit" className="form-contol btn btn-lg btn-dark" value="Send" />
                                                </div>
                                            </div>
                                        </form>
                                       
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Chat;