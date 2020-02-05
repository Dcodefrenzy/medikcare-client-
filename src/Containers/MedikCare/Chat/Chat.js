import React, {useState, useEffect} from "react" ;
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';




const Chat =(props)=>{
    const to  = props.match.params.id
    let session;
    
    const [message, setMessage] = useState({id:"msg", value:"", type:"text"}) 
    const [messages, setDisplayMessage] = useState([]) 
    const [scroll, setScroll] = useState({scroll:"scroll"}) 
    const getSession = ()=> {
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
        if(sessionItemDoctor === null && sessionItemUser === null) {
            window.history.back();
        }else if(sessionItemUser === null && sessionItemDoctor !== null){
            sessionItemDoctor.isUser = false;
            return session = sessionItemDoctor;
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            sessionItemUser.isUser = true;
            return session = sessionItemUser;
        }
    }

    const notify = (data)=>{
        
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
        let url = "";
         if(sessionItemUser === null && sessionItemDoctor !== null){
            url =  "/api/v1/user/notify-user";
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            url = "/api/v1/doctor/notify-doctor";
        }
        console.log(data)
        fetch(url, {
            method:"POST",
            body:JSON.stringify(data),
            headers:{'Content-Type': "application/json", "u-auth":session.token}
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
    const scrollHandler =()=>{
        //scroll.scroll.scrollIntoView({behavior:"smooth"})
       // window.HTMLElement.prototype.scrollIntoView = function(){}
    }
    const setMessageHandler =(event)=>{
        setMessage ({id:"msg", value:event.target.value, type:"text"})
    }
    
    const socket = io("http://localhost:8080");
    const submitChatMessage=(event)=>{
        event.preventDefault();
        getSession();
        let messageData ={};
        
        messageData = {"message": message.value, "from":session._id, "to":to}; 
        notify(messageData); 
        
         socket.emit("send message", messageData);
    }

    socket.on("get message",(dataset)=>{
       
        setDisplayMessage(dataset);
        setMessage ({id:"msg", value:"", type:"text"}) 
    })
    
    const fetchChatMessage =()=>{       
       const messageData = {"from":session._id, "to":to};  
        socket.emit("fetch message", messageData);
    }

    socket.on("fetch message",(dataset)=>{
        scrollHandler();
        setDisplayMessage(dataset);
    })
    useEffect(()=>{
        getSession();
        fetchChatMessage();
    }, []);
    const displayMessages = messages.map((message, index)=>{
        getSession();    
        let float;
        let tick;
        let  Color;
        let cardColor;
        let cardBodyColor;  
        let dilivery; 
            if (message.dilivery === true) {
                dilivery =  <i className="fa fa-check" aria-hidden="true"></i>
            }else{
                dilivery =  <i className="fa fa-check text-dark" aria-hidden="true"></i>
            }

        if (message.from === session._id) {
             float = "float-right";
             tick = dilivery;
              Color = " medik-color";
             cardColor = "";
             cardBodyColor = "";
             name = session.name

        } else{
             float = "float-left";
             tick = "";
              Color = "text-dark";
             cardColor = " b-medik";
             cardBodyColor = "text-white";
        }
           return <div className={"max-width  "+float} key={message._id}>
                <div className={"card "+cardColor}>
                    <div className={"card-body "+cardBodyColor}>
                    <i className={"card-text "+Color}>{name}</i>
                        <p className="card-text">{message.message}</p>
                        <span className={"card-text "+float+" "+Color}><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment fromNow>{message.createdAt}</Moment> {tick}</span>
                    </div>
                </div>
            </div>


    })
    return(
        <div className="overflow-hidden">
            <div className="container-fluid bg-dark">
                <div className="row">
                    <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                        <div className="card bg-dark">
                            <div className="card-body">
                                <div className="card bg-dark chat-static chat-static-top">
                                    <div className="card-body text-white">
                                       <div className="row justify-content-center">
                                           <div className="col-10">
                                                <i className="fa fa-arrow-left fa-lg" aria-hidden="false"> Back</i>
                                           </div>
                                            <div className="col-2">
                                                <div className="dropdown">
                                                    <i className="fa fa-ellipsis-v  fa-3x" aria-hidden="true" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></i>
                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="#">End Chat</a>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Back</a>
                                                    </div>
                                                </div>  
                                            </div>
                                       </div>
                                    </div>
                                </div>
                               <div className="chat top-padding-md">
                                   {displayMessages}
                               </div>
                                <div className="clearfix bottom-padding-lg" id={scroll.scroll}></div>
                                <div className="card bg-dark chat-static chat-static-buttom">
                                   <div className="card-body">
                                        <form onSubmit={submitChatMessage}>
                                            <div className="row">
                                               <div className="col-10">
                                                    <div className="form-group">
                                                        <textarea id={message.id} onChange={(event) => setMessageHandler(event,message.id)} type={message.type} value={message.value}  className="form-control chat-message" placeholder="Start a new message" rows="1"></textarea>
                                                    </div>
                                               </div>
                                               <div className="col-2">
                                                   <input type="submit" className="form-contol btn btn-lg btn-medik" value="Send" />
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