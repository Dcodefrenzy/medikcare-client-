import React, {useState, useEffect, createContext} from "react" ;
import ChatDashboardNotification from "./ChatDashboardNotification";
import ChatDashbordNewChat from "./ChatDashbordNewChat";
import ChatDashbordActivities from "./ChatDashBoardActivities";
import { Link } from 'react-router-dom';




const ChatDashboard = (props) =>{
    const [displays, setEventDisplays] = useState({notification:{display:"display-show",active:"chat-dashboard-active"},message:{display:"display-none",active:""},task:{display:"display-none",active:""}})
   const [session, setSession] = useState({});
   let dashboardLink;
   const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
   const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));

    
    const getSession = ()=> {
        if(sessionItemDoctor === null && sessionItemUser === null) {
            window.history.back();
        }else if(sessionItemUser === null && sessionItemDoctor !== null){
            sessionItemDoctor.isUser = false;
            return sessionItemDoctor
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            sessionItemUser.isUser = true;
            return sessionItemUser
        }
    }
    if (sessionItemUser === null && sessionItemDoctor !== null) {
        dashboardLink ={chatDashboard :"/chat/doctors/doctor", userDashboard:"/doctor/dashboard"}
  }else if (sessionItemUser !== null && sessionItemDoctor === null) {
       dashboardLink ={chatDashboard :"/chat/doctors", userDashboard:"/user/dashboard"}
  }
  useEffect(()=>{
    getSession();
}, []);

    return(
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                            <div className="">
                                <div className="card position-fixed fixed-top">
                                    <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <div className="col-3">
                                        <Link to={dashboardLink.userDashboard}>
                                            <i className="fa fa-arrow-left fa-lg text-dark" aria-hidden="false"> </i>
                                        </Link>
                                        </div>
                                            <div className="col-3">
                                            <Link to="/chat/dashboard">
                                                <i  id="bell" className="fa fa-bell fa-2x chat-dashboard-active" aria-hidden="true"></i>
                                            </Link>
                                        </div>   
                                        <div className="col-3">
                                            <Link to={dashboardLink.chatDashboard}>
                                                <i  id="newMessage" className="fa fa-plus-circle fa-2x text-dark"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/notifications">
                                                <i  id="activities" className="fa fa-tasks fa-2x text-dark"   aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat top-margin-lg">
                                            <ChatDashboardNotification />
                                       
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDashboard;