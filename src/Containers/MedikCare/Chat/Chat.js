import React, {useState, useEffect, useRef} from "react" ;
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import {socket} from '../Socket/Socket';
import ChatDisplay from "./ChatDisplay";
 
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
    const chatSession = JSON.parse(sessionStorage.getItem("chatSession")) 
    const [userDetail,setUserDetail] = useState({});
    const [message, setMessage] = useState({messageState:false});
    const [room, setRoomSession] = useState(null);

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
    const onUnload=(event)=>{
        event.addEventListener();
        return "Changes you made may not be saved";
    }

    useEffect(()=>{
        window.addEventListener("beforeunload", onUnload);
        getUserDetailsHandller(); 
        socket.emit("validate session", {from:sess._id, to:to}); 
        socket.on("validate session", (session)=>{     
        setRoomSession(session._id);
        })
    }, []);




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
                                <ChatDisplay socket={socket} session={sess} message={message} to={to} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Chat;