import React, {useState, useEffect, useRef} from "react" ;
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
 




const Chat =(props)=>{
    const to  = props.match.params.id
    let session;
    let dashboardLink;
    let userUrl;
    
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [message, setMessage] = useState({id:"msg", value:"", type:"text"}) 
    const [messages, setDisplayMessage] = useState([]) 
    const [notifyMessages, setDisplayNotifyMessage] = useState({ value:""}) 
    const [scroll, setScroll] = useState({id:"scroll"}) 
    const [userDetail,setUserDetail] = useState({});
    const [room, setRoomSession] = useState({roomSession:null});

    const element = useRef(null);

    const getSession = ()=> {
        if(sessionItemDoctor === null && sessionItemUser === null) {
            window.location ="/not-found"
        }else if(sessionItemUser === null && sessionItemDoctor !== null){
            sessionItemDoctor.isUser = false;
            return session = sessionItemDoctor;
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            sessionItemUser.isUser = true;
            return session = sessionItemUser;
        }
    }

    const allowPush=()=>{
        const OneSignal = window.OneSignal || []; 
            
      //  OneSignal.showSlidedownPrompt();
      
			OneSignal.push(function() {
				// Occurs when the user's subscription changes to a new value.
				OneSignal.on('subscriptionChange', function (isSubscribed) {
                    if (isSubscribed) {
                        OneSignal.getUserId().then(function(userId) {
                            let url;
                            if (sessionItemUser === null && sessionItemDoctor !== null) {
                            url = "/api/v1/doctor/update/notification/"+userId
                            }else if (sessionItemUser !== null && sessionItemDoctor === null) {
                                url = "/api/v1/user/update/notification/"+userId
                            }
                        if (userId) {	
                            fetch(url, {
                                method: "PATCH",
                                headers: {'Content-Type': "application/json", "u-auth": session.token}
                            })
                            .then(res => res.json())
                            .then(response => { 
                                if(response.status === 401) {
                                sessionStorage.removeItem("user");
                                    window.location = "/login?Session expired please login."
                                }else if (response.status === 200) {
                                    
                                }
                            })
                            }
                            
                        
                        })
                    }
				  console.log("The user's subscription state is now:", isSubscribed);
				});
				
				// This event can be listened to via the `on()` or `once()` listener.
			  });
    }


    if (sessionItemUser === null && sessionItemDoctor !== null) {
          dashboardLink ="/chat/doctors/doctor";
          userUrl = "/api/v1/doctor/find-user/"+to;
    }else if (sessionItemUser !== null && sessionItemDoctor === null) {
         dashboardLink ="/chat/doctors";
         userUrl = "/api/v1/user/find-doctor/"+to;
    }
    const scrollToBottom = ()=>{
          
        element.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
     
    }

    const getUserDetailsHandller = ()=>{

        fetch(userUrl, {
            method:"GET",
            headers: {'Content-Type': "application/json", "u-auth":session.token}
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
    const notify = (data)=>{
        
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
        let url = "";
         if(sessionItemUser === null && sessionItemDoctor !== null){
            url =  "/api/v1/user/notify-user";
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            url = "/api/v1/doctor/notify-doctor";
        }
        //console.log(data)
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
    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979"
	  }else if(process.env.NODE_ENV === 'production'){
            port =    "";
      }

    
    const socket = io(port,{transports: ['websocket']});
    const submitChatMessage=(event)=>{
        event.preventDefault();
        getSession();
        let messageData ={};
        
        messageData = {"message": message.value, "from":session._id, "to":to, "room":room.roomSession}; 
      
        setDisplayNotifyMessage({value:message.value})
         socket.emit("send message", messageData);
        setMessage ({id:"msg", value:"", type:"text"}) 
       // messages.push({_id:Date.now(), message:message.value,createdAt:Date.now(),from:session._id});
         
   //setDisplayMessage(messages);
        //notify(messageData);
        scrollToBottom();
    }

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
         
         setMessage ({id:"msg", value:"", type:"text"})

         messages.push({_id:dataset._id, message:dataset.message,createdAt:Date.now(),from:dataset.from});
         console.log(messages)
         setDisplayMessage(messages => messages.concat({_id:dataset._id, message:dataset.message,createdAt:Date.now(),from:dataset.from})); 
          let messageData ={};
        
      //   messageData = {"message": dataset[dataset.length-1].message, "from":session._id, "to":props.match.params.id}; 
      
        messageData = {"message": dataset.value, "from":session._id, "to":to}; 
         notify(messageData);
         scrollToBottom();
     }
     })
     
    const fetchChatMessage =()=>{       
       const messageData = {"from":session._id, "to":to};  
        socket.emit("fetch message", messageData);
    }

    socket.on("fetch message",(dataset, roomSession)=>{
        if (dataset === false && !sessionItemUser) {
            setDisplayMessage([]);
            window.location = "/chat/doctors/doctor";
        }else if (dataset === false && !sessionItemDoctor) {
            setDisplayMessage([]);
            window.location = "/chat/doctors";
        }else if (dataset === false && !sessionItemUser && !sessionItemDoctor) {
            window.location = "/";
     }else{
        
        setRoomSession({roomSession:roomSession});
        setDisplayMessage(dataset);
        scrollToBottom();
        }
    })

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
        //console.log(session)
        if (sessionItemDoctor) {
            window.location = "/chat/report/"+id;
        }else if(sessionItemUser){
            window.location = "/chat/feedback/"+id;
        }
    }


    useEffect(()=>{
        getSession();
        allowPush();
        fetchChatMessage();
        getUserDetailsHandller();
     
    }, []);



    const displayMessages = messages.map((message, index)=>{
        getSession();    
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

        if (message.from === session._id) {
             float = "float-right";
             tick = delivery;
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
             name = userDetail.name
        }
           return <div className={"max-width  "+float} key={message._id}>
                <div className={"card "+cardColor}>
                    <div className={"card-body "+cardBodyColor}>
                        <i className={Color}>{name}</i>
                        <p className="">{message.message}</p>
                        <Moment fromNow>{message.createdAt}</Moment>
                    </div>
                </div>
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
                                           <div className="col-10">
                                               <Link to={dashboardLink}>
                                                <i className="fa fa-arrow-left fa-lg text-white" aria-hidden="false"></i>
                                                </Link>
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
                                <p className="col-12 row bottom-padding-lg clearfix" ref={element}>click the bell on the right for notification</p>
                               </div>
                                <div className="clearfix bottom-padding-lg top-padding-md" id={scroll.scroll}></div>
                                <div className="card b-medik position-fixed  chat-static-buttom">
                                   <div className="card-body">
                                        <form onSubmit={submitChatMessage}>
                                            <div className="row">
                                               <div className="col-8">
                                                    <div className="form-group">
                                                        <textarea id={message.id} onChange={(event) => setMessageHandler(event,message.id)} type={message.type} value={message.value}  className="form-control chat-message" placeholder="Write a message" rows="1" required></textarea>
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