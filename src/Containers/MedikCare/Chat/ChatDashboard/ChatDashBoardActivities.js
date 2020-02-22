import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

const ChatDashbordActivities = (props) =>{
    let dashboardLink;
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
  }else if (sessionItemUser !== null && sessionItemDoctor === null) {
       dashboardLink ={chatDashboard :"/chat/doctors", userDashboard:"/user/dashboard"}
  }

  const setLogsHandler=()=>{
      const title = "Chat";
    const url = "/api/v1/logs/user/"+title;
    fetch(url, {
        method: "GET",
        headers: {'Content-Type': "application/json", "u-auth": session.token}
    })
    .then(res => res.json())
    .then(response => { console.log(response)
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
    return <div className="card b-medik" key={log._id}>
        <div className="card-body text-white">
            <i className="fa  fa-bell fa-2x text-success float-right" aria-hidden="true"></i>
            <h3 className="card-text text-dark">{log.title}</h3>
            <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment fromNow>{log.date}</Moment></span>
            <h6 className="card-text">{log.description}.</h6>
        </div>
    </div>
})
    return(
        <div className="container-fluid b-medik">
        <div className="container">
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="">
                        <div className="">
                            <div className="card b-medik position-fixed fixed-top">
                                <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <div className="col-3">
                                        <Link to={dashboardLink.userDashboard}>
                                            <i className="fa fa-arrow-left fa-lg text-white" aria-hidden="false"> Back</i>
                                        </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/dashboard">
                                                <i  id="bell" className="fa fa-bell fa-3x text-white" aria-hidden="true"></i>
                                            </Link>
                                        </div>   
                                        <div className="col-3">
                                            <Link to={dashboardLink.chatDashboard}>
                                                <i  id="newMessage" className="fa fa-plus-circle fa-3x text-white"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/notifications">
                                                <i  id="activities" className="fa fa-tasks fa-3x  chat-dashboard-active"  aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat">
                                    <section> 
                                        <div className={props.display}>
                                            <h1 className="text-dark text-center">Activities</h1>
                                            {logsDisplay}
                                        </div>
                                        </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDashbordActivities;