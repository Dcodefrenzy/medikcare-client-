import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

const ChatDashbordActivities = (props) =>{
    let dashboardLink;
    let chatLink;
    let session;
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [logs, setLogs ] = useState([]);
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
        dashboardLink ={chatDashboard :"/chat/doctors/doctor", userDashboard:"/doctor/dashboard"}
        chatLink = "/chat/doctors/doctor"
  }else if (sessionItemUser !== null && sessionItemDoctor === null) {
       dashboardLink ={chatDashboard :"/chat/doctors", userDashboard:"/user/dashboard"}
       chatLink = "/chat/doctors"
  }

  const setLogsHandler=()=>{
      const title = "Chat";
      let person ;
      if(sessionItemUser === null && sessionItemDoctor !== null){
        person = "doctor"
      }else if(sessionItemUser !== null && sessionItemDoctor === null){
         person = "user"
      }
    const url = `/api/v1/logs/${person}/${title}`;
    fetch(url, {
        method: "GET",
        headers: {'Content-Type': "application/json", "u-auth": session.token}
    })
    .then(res => res.json())
    .then(response => { //console.log(response)
        if(response.status === 401) {
           sessionStorage.removeItem("user");
            window.location = "/login?Session expired please login."
        }else if (response.status === 200) {
         
              setLogs(response.message);
        }
    })
}

  useEffect(()=>{
    getSession();
    setLogsHandler();
}, []);
const logsDisplay = logs.sort().map((log, index)=>{
    return <div className="card bottom-margin-sm" key={log._id}>
        <div className="card-body text-dark">
            <i className="fa  fa-bell fa-2x text-success float-right" aria-hidden="true"></i>
            <h6 className="card-text text-dark">{log.title}</h6>
            <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment fromNow>{log.date}</Moment></span>
            <h6 className="card-text">{log.description}.</h6>
        </div>
    </div>
})
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="">
                            <div className="card position-fixed fixed-top">
                                <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <Link to={dashboardLink.userDashboard}>
                                            <i className="fa fa-arrow-left fa-lg text-dark" aria-hidden="false"> </i>
                                        </Link>  
                                        <div className="col-3">
                                            <Link to={chatLink}>
                                                <i  id="newMessage" className="fa fa-plus-circle fa-2x text-dark"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/notifications">
                                                <i  id="bell" className="fa fa-bell fa-2x  chat-dashboard-active"  aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat top-margin-lg">
                                        <div className={props.display}>
                                            <h6 className="text-dark text-center">Activities</h6>
                                            {logsDisplay}
                                        </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
    )
}

export default ChatDashbordActivities;