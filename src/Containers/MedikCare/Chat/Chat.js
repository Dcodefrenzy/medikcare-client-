import React, {useState, useEffect, useRef} from "react" ;
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import {socket} from '../Socket/Socket';
 
const Chat =(props)=>{
    const to  = props.match.params.id
 
    let dashboardLink;
    let userUrl;
    let medikForm;
    let isUserActive = false;
    let isDoctorActive = true;
    let sess;
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [message, setMessage] = useState({id:"msg", value:"", type:"text"}) 
    const [userMessage, setUserMessage]=useState({id:"msg", value:"", type:"text"});
    const [doctorMessage, setDoctorMessage]=useState({id:"msg", value:"", type:"text"});
    const [messages, setDisplayMessage] = useState([]) 
    const [notifyMessages, setDisplayNotifyMessage] = useState({ value:""}) 
    const [scroll, setScroll] = useState({id:"scroll"}) 
    const [userDetail,setUserDetail] = useState({});
    const [room, setRoomSession] = useState({roomSession:null});
    const [session, setSession] = useState({});

    const element = useRef(null);

    
    const sessionHandller=()=>{
        if(sessionItemUser === null && sessionItemDoctor !== null){
            setSession({sessionItemDoctor})
                getUserDetailsHandller();
           
                fetchChatMessage();

       }else if(sessionItemUser !== null && sessionItemDoctor === null) {
           setSession(sessionItemUser)
           getUserDetailsHandller();
           
       fetchChatMessage();
       }else{
           console.log("err")
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
          sess = sessionItemDoctor;
          medikForm = <textarea id={doctorMessage.id} onChange={(event) => setMessageHandler(event,doctorMessage.id)} type={doctorMessage.type} value={doctorMessage.value}  className="form-control chat-message" placeholder="Write a message" rows="1" required></textarea>
    }else if (sessionItemUser !== null && sessionItemDoctor === null) {
         dashboardLink ="/chat/doctors";
         userUrl = "/api/v1/user/find-doctor/"+to;
         sess = sessionItemUser;
         medikForm = <textarea id={userMessage.id} onChange={(event) => setMessageHandler(event,userMessage.id)} type={userMessage.type} value={userMessage.value}  className="form-control chat-message" placeholder="Write a message" rows="1" required></textarea>
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
        console.log(url)
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

    const setMessageHandler =(event)=>{
        if(sessionItemUser === null && sessionItemDoctor !== null){
            setDoctorMessage({id:"msg", value:event.target.value, type:"text"});
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            setUserMessage({id:"msg", value:event.target.value, type:"text"});
        }
    }


    
    //const socket = io(port, {transports: ['websocket']});
    const submitChatMessage=(event)=>{
        event.preventDefault();
        let messageData ={};
        if(sessionItemUser === null && sessionItemDoctor !== null){
            messageData = {"message": doctorMessage.value, "from":sess._id, "to":to, "room":room.roomSession};
             setDoctorMessage({id:"msg", value:"", type:"text"}) 
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
        messageData = {"message": userMessage.value, "from":session._id, "to":to, "room":room.roomSession};
        setUserMessage({id:"msg", value:"", type:"text"}) 
        }
         
      
        setDisplayNotifyMessage({value:message.value})
         socket.emit("send message", messageData);
        setDisplayMessage(messages => messages.concat({_id:Date.now(), delivery:true, message:messageData.message,createdAt:Date.now(),from:sess._id}));
        scrollToBottom();
    }


     
    const fetchChatMessage =()=>{       
       const messageData = {"from":sess._id, "to":to};  
        socket.emit("fetch message", messageData);
    }

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
        sessionHandller();
        allowPush();
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
                 console.log(sess)
               let messageData = {"message": dataset.message, "from":sess._id, "to":props.match.params.id}; 
                if (dataset.from !== sess._id) {
                    setDisplayMessage(messages => messages.concat({_id:dataset._id, message:dataset.message, createdAt:dataset.createdAt, from:dataset.from, to:dataset.to}));   
                }
    
                if( sessionItemUser === null && dataset.from ===  sess._id ){
                    notify(messageData, "/api/v1/user/notify-user");
                }else if(sessionItemDoctor === null && dataset.from === sess._id) {
                    notify(messageData, "/api/v1/doctor/notify-doctor");
                }
    
            }
            scrollToBottom();
         })
     
    }, []);



    const displayMessages = messages.map((message, index)=>{
       // getSession();    
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
                <i><Moment fromNow>{message.createdAt}</Moment></i>
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
                                        <form onSubmit={submitChatMessage}>
                                            <div className="row">
                                               <div className="col-8">
                                                    <div className="form-group">
                                                       {medikForm} 
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