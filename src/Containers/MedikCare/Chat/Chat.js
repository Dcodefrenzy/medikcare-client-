import React, {useState, useEffect, useRef} from "react" ;
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
 




const Chat =(props)=>{
    const to  = props.match.params.id
    let session;
    let dashboardLink;
    
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [message, setMessage] = useState({id:"msg", value:"", type:"text"}) 
    const [messages, setDisplayMessage] = useState([]) 
    const [notifyMessages, setDisplayNotifyMessage] = useState({ value:""}) 
    const [scroll, setScroll] = useState({id:"scroll"}) 

    const element = useRef(null);


    const getSession = ()=> {
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

    if (sessionItemUser === null && sessionItemDoctor !== null) {
          dashboardLink ="/chat/doctors/doctor";
    }else if (sessionItemUser !== null && sessionItemDoctor === null) {
         dashboardLink ="/chat/doctors"
    }
    const scrollToBottom = ()=>{
          
        element.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
     
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
    }
    const setMessageHandler =(event)=>{
        setMessage ({id:"msg", value:event.target.value, type:"text"})
    }
    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979/socket.io"
	  }else if(process.env.NODE_ENV === 'production'){
            port =    "";
      }

    
    const socket = io(port,{transports: ['websocket']});
    const submitChatMessage=(event)=>{
        event.preventDefault();
        getSession();
        let messageData ={};
        
        messageData = {"message": message.value, "from":session._id, "to":to}; 
      
       // setDisplayNotifyMessage({value:message.value})
         socket.emit("send message", messageData);
    }

    socket.on("get message",(dataset)=>{
       if (dataset === false && sessionItemUser) {
        setDisplayMessage([]);
        window.location = "/chat/doctors/doctor";
       }else if (dataset === false && sessionItemDoctor) {
        setDisplayMessage([]);
        window.location = "/chat/doctors";
    }else{
        
        setMessage ({id:"msg", value:"", type:"text"})
        setDisplayMessage(dataset);
       let  messageData = {"message": notifyMessages.value, "from":session._id, "to":to}; 
        notify(messageData); 
        
        setMessage ({id:"msg", value:"", type:"text"}) 
        scrollToBottom();
    }
    })
    
    const fetchChatMessage =()=>{       
  
       const messageData = {"from":session._id, "to":to};  
        socket.emit("fetch message", messageData);
    }

    socket.on("fetch message",(dataset)=>{
        if (dataset === false && sessionItemUser) {
            setDisplayMessage([]);
            window.location = "/chat/doctors/doctor";
        }else if (dataset === false && sessionItemDoctor) {
            setDisplayMessage([]);
            window.location = "/chat/doctors";
        }else{
            
           
        setDisplayMessage(dataset);
        scrollToBottom();
        }
    })


    const endSession=(event)=>{
        event.preventDefault();
        console.log(session)
        const sessionData = {"from":session._id, "to":to};  
        socket.emit("end session", sessionData);
    }
    socket.on("end session", (dataset, sessionData)=>{
        if (sessionItemDoctor) {
            window.location = "/chat/report/"+dataset.from+"/"+sessionData._id;
        }else if(sessionItemUser){
            window.location = "/chat/feedback/"+dataset.to+"/"+sessionData._id;
        }
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
           return <div className={"bottom-margin-md max-width  "+float} key={message._id}>
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
                                               <Link to={dashboardLink}>
                                                <i className="fa fa-arrow-left fa-lg text-white" aria-hidden="false"> Back</i>
                                                </Link>
                                           </div>
                                            <div className="col-2">
                                                <div className="dropdown dropleft ">
                                                    <i className="fa fa-ellipsis-v  fa-3x" aria-hidden="true" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></i>
                                                    <div className="dropdown-menu">
                                                        <div><a onClick={(event)=>endSession(event)} className="dropdown-item" href="#">End Chat</a></div>
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
                                
                                <div className="clearfix" ref={element}></div>
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