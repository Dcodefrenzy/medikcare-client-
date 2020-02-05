import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';




const ChatDashbordNewChatDoctor = (props) =>{
    const [sessions, displaySession] = useState([])
         
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    
    const   [alert, setAlert]= useState({buttonDisplay:"block", spinnerDisplay:""})
        let session;
    const getSession = ()=> {

        if(sessionItemDoctor === null) {
            window.location = "/doctor/login?Session expired please login.";
        }
    }
    
    const socket = io("http://localhost:8080");
   const fetchDoctorsSessions =()=>{
        socket.emit("fetch session", sessionItemDoctor._id);
    }
    socket.on("fetch session", (sessions)=>{ 
        console.log(sessions)      
        setAlert({buttonDisplay:"display-none", spinnerDisplay:"display-none"})
        displaySession(sessions);
    })


    useEffect(()=>{
        getSession();
        fetchDoctorsSessions();
    }, [])

    const sessionDetails = sessions.map((session)=>{
            
      return    <div className="card b-medik" key={session._id}>
                    <div className="card-body text-white">
                    <i className={`fa fa-circle text-success float-right`} aria-hidden="true"></i>
                        <h3 className="card-text text-white"><i className="fa fa-user text-white" aria-hidden="true"></i> {session.from}</h3>
                        <p className="card-text text-white">Session status: <span className="text-white">On session</span></p>
                        <p className="card-text text-white">Time: <Moment fromNow>{session.start}</Moment></p>
                        <Link to={"/chat/"+session.from}>
                            <i className="fa fa-envelope fa-2x text-white float-right" aria-hidden="true" />                   
                        </Link>   
                    </div>
                </div>
        })
    return( 
        <div className="container-fluid b-medik">
        <div className="container">
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="card b-medik">
                        <div className="card-body">
                            <div className="card b-medik position-fixed fixed-top">
                                <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <div className="col-3">
                                        <Link to="/doctor/dashboard">
                                            <i className="fa fa-arrow-left text-white fa-lg" aria-hidden="false"> Back</i>
                                        </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/dashboard">
                                                <i  id="bell" className="fa fa-bell fa-3x text-white" aria-hidden="true"></i>
                                            </Link>
                                        </div>   
                                        <div className="col-3">
                                            <Link to="/chat/doctors/doctor">
                                                <i  id="newMessage" className="fa fa-plus-circle fa-3x chat-dashboard-active"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/notifications">
                                                <i  id="activities" className="fa fa-tasks fa-3x text-white"  aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat">
                                    <section> 
                                        
                                <div className={"text-center "+alert.spinnerDisplay}>
                                         <i className="fa fa-spinner fa-pulse text-white fa-3x"></i>
                                    </div>
                                        <div className="">
                                            <h1 className="text-dark text-center">Patient Sessions</h1>
                                                    {sessionDetails}
                                               
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

export default ChatDashbordNewChatDoctor;