import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DoctorLoginSession from '../../Medicals/Doctors/DoctorsLogins/LoginSession';




const ChatDashbordNewChatDoctor = (props) =>{
    const [sessions, displaySession] = useState([]);
    const [newSession, setNewSession] = useState([]);
    const [doctorSession, setDoctorSession] = useState({display:"display-none"})
         
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    
    const   [alert, setAlert]= useState({newSessionDisplay:"display-none", sessionDisplay:"display-none",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})
    let session;

    const getSession = ()=> {

        if(sessionItemDoctor === null) {
            setDoctorSession({display:"row"})
        }
    }  
    
    const fetchSessions = ()=>{
        const url = "/api/v1/chatSession";
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "u-auth": sessionItemDoctor.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 401) {
                sessionStorage.removeItem("doctor");
                setDoctorSession({display:"row"});
            }else if (response.status === 403) { 
                setAlert({ newSessionDisplay:"display-none",sessionDisplay:"display-none",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})
            }else if (response.status === 200) {
                if (response.message.length < 1 && sessions.length > 0) {
                    setAlert({newSessionDisplay:"display-none", sessionDisplay:"top-margin-md",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})

                }else{
                    setAlert({newSessionDisplay:"top-margin-md", sessionDisplay:"top-margin-md",buttonDisplay:"display-none", alertDisplay:"display-none", spinnerDisplay:"display-none"})

                    setNewSession(response.message)
                   
                }
            }
        })
    }

    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979";
	  }else if(process.env.NODE_ENV === 'production'){
         port = "";
      }

    
    const socket = io(port,{transports: ['websocket']});

    const fetchDoctorsSessions =()=>{
        if(sessionItemDoctor === null) {
            setDoctorSession({display:"row"})
        }else{
            socket.emit("fetch session", sessionItemDoctor._id);
        }
    }
    socket.on("fetch session", (sessions)=>{     
        setAlert({buttonDisplay:"display-none", alertDisplay:"display-none", spinnerDisplay:"display-none"})
            fetchSessions();
            console.log(sessions)
        displaySession(sessions);
    })


    useEffect(()=>{
        getSession();
        fetchDoctorsSessions();
    }, [])

    const sessionDetails = sessions.map((session, index)=>{
            let id;
            if (session.from === session._id) {
                id = session.to;
            }else{
                id = session.from;
            }

      return    <Link to={"/chat/"+id} key={index}>
                <div className="card ">
                    <div className="card-body text-dark">
                    <i className={`fa fa-circle text-success float-right`} aria-hidden="true"></i>
                        <h6 className="card-text text-dark"><i className="fa fa-user text-white" aria-hidden="true"></i> {session.from}</h6>
                        <p className="card-text text-dark">Session status: <span className="text-white">On session</span></p>
                        <p className="card-text text-dark">Time: <Moment fromNow>{session.start}</Moment></p>
                        
                            <i className="fa fa-envelope fa-2x text-dark float-right" aria-hidden="true" />                      
                    </div>
                </div>
                </Link> 
        })    
        const newSessionDetails = newSession.map((newSession)=>{
            let color
            if (newSession.message.emergencyLevel == 1) {
                newSession.message.emergencyLevel = "Not Critical";
                color = "text-primary"
            }else if (newSession.message.emergencyLevel == 2) {
                newSession.message.emergencyLevel = "Managable";
                color = "text-warning";
            }else if (newSession.message.emergencyLevel == 3) {
                newSession.message.emergencyLevel = "Critical";
                color = "text-danger";
            }
            return    <Link to={"/chat/session/"+newSession.message.userId} key={newSession.message._id}>
                      <div className="card ">
                          <div className="card-body text-dark">
                              <span className="card-text text-dark">Patient Complains:</span>
                            <p>{newSession.message.complain}</p>
                            <p className="card-text text-dark"><i className="fa fa-clock"></i> <Moment fromNow>{newSession.message.createdAt}</Moment></p>                           
                             <button className="btn btn-sm btn-success">Proceed</button>  
                            <span className={`${color} float-right`} aria-hidden="true"><b className="text-dark">Emergency level: </b>{newSession.message.emergencyLevel}</span>                    
                          </div>
                      </div>
                      </Link> 
              })
    return( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="">
                        <div className="card-body">
                            <div className="card  position-fixed fixed-top">
                                <div className="card-body text-dark">
                                    <div className="row justify-content-between">
                                        <div className="col-3">
                                        <Link to="/doctor/dashboard">
                                            <i className="fa fa-arrow-left text-dark fa-lg" aria-hidden="false"></i>
                                        </Link>
                                        </div>   
                                        <div className="col-3">
                                            <Link to="/chat/doctors/doctor">
                                                <i  id="newMessage" className="fa fa-plus-circle fa-2x chat-dashboard-active"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/notifications">
                                            <i  id="bell" className="fa fa-bell fa-2x text-dark" aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat">
                                                            
                            <section className={alert.alertDisplay}>
                                <div className="container verification section">
                                    <div>
                                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
                                            <div className="">
                                                <div className="card-body">
                                                    <h3 className="text-dark">No Sessions Yet</h3>
                                                    <p className="top-margin-md text-dark">There are no sessions yet, you can check back in the next hour.👍</p>
                                                    <div className="col-12 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4 top-margin-md"> 
                                                        <Link to="/doctor/dashboard">
                                                            <button className="btn btn-medik top-margin-md">Go to dashboard</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="top-margin-lg"> 
                                <div className={alert.sessionDisplay}>
                                    <h6>You have a session already</h6>
                                    {sessionDetails}   
                                </div>
                                <div className={alert.newSessionDisplay}>
                                    <h6>Patient Waiting List</h6>
                                    {newSessionDetails}
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DoctorLoginSession display={doctorSession.display} />
            </div>
        
    )
}

export default ChatDashbordNewChatDoctor;