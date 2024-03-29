import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import {socket} from '../../Socket/Socket';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DoctorLoginSession from '../../Medicals/Doctors/DoctorsLogins/LoginSession';
import Loading from '../../Loading/Loading';
import ChatOngoingSessionRead from './ChatOngoingSessionRead';




const ChatOngoingSessions = (props) =>{
    const [sessions, displaySession] = useState([]);
    const [newSession, setNewSession] = useState([]);
    const [doctorSession, setDoctorSession] = useState({display:"display-none"});
    const [sessionFullDisplay, setSessionFullDisplay] = useState({display:"display-none"});
    const [sessionFullDetails, setSessionFullDetails] = useState({usermail:"",doctormail:"",sessionDate:"",complains:"",userId:"", username:"", doctorId:"", doctorname:"", sessionId:""});
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [display, setDIsplay] = useState("");
    
    const   [alert, setAlert]= useState({newSessionDisplay:"display-none", sessionDisplay:"display-none",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"});
    let session;

    const getSession = ()=> {

        if(sessionItemDoctor === null) {
            setDoctorSession({display:"row"});
        }
    }  
    
 

    const ongoingSession=(userSessions)=>{
        const url = "/api/v1/doctor/users-session";
        fetch(url,{
            method:"POST",
            body:JSON.stringify(userSessions),
            headers:{"Content-Type":"application/json", "u-auth":sessionItemDoctor.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 200) {
                
            setDIsplay("display-none")
                if (response.message.length < 1) {
                    setAlert({newSessionDisplay:"top-margin-md", sessionDisplay:"top-margin-md",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})

                }else{
            displaySession(response.message);
            }
                }
            else{
             setAlert({newSessionDisplay:"top-margin-md", sessionDisplay:"top-margin-md",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})

            setDIsplay("display-none")
            displaySession(response.message);
            }
        });
    }


    const fetchDoctorsSessions =()=>{
        if(sessionItemDoctor === null) {
            setDoctorSession({display:"row"});
        }else{
            socket.emit("fetch all sessions");
        }
    }
    socket.on("fetch all sessions", (sessions)=>{     
        setAlert({buttonDisplay:"display-none", alertDisplay:"display-none", spinnerDisplay:"display-none"});
            ongoingSession(sessions);
    });

    

const checkUserSession = (event, data)=>{
    const url = "/api/v1/chatSession/doctor-check";
    
    fetch(url, {
        method: "PATCH",
        body:JSON.stringify(data),
        headers: {'Content-Type': "application/json", "u-auth": sessionItemDoctor.token}
    })
    .then(res => res.json())
    .then(response => { 
        if(response.status === 401) {
            sessionStorage.removeItem("doctor");
            
        }else if (response.status === 403) {
            console.log(response)
            const sessionData = {"from":response.message.chatSession.from, "to":response.message.chatSession.to};
            socket.emit("end session", sessionData);
        }else if (response.status === 200) {console.log(response.message)
            setSessionFullDisplay({display:""})
            setSessionFullDetails({
                        userId:response.message.user._id, 
                        username:response.message.user.name, 
                        usermail:response.message.user.email,
                        doctorId:response.message.doctor._id, 
                        doctorname:response.message.doctor.name, 
                        doctormail:response.message.doctor.email,
                        sessionId:response.message.session._id,
                        complains:response.message.session.complain,
                        sessionDate:response.message.chatSession.start
                    });
        }
    })
}
const reverseDisplay = (event)=>{
    setSessionFullDisplay({display:"display-none"});
}


    useEffect(()=>{
        getSession();
        fetchDoctorsSessions();
    }, [])

    const sessionDetails = sessions.map((session, index)=>{
            let id;
   
               
      return  <div onClick={event => checkUserSession(event, session.sessions)} className="card bottom-margin-sm box-shadow" key={index}>
                    <div className="card-body text-dark">
                    <i className={`fa fa-circle text-success float-right`} aria-hidden="true"></i><p className="card-text text-dark">Session status: <span className="text-dark">On session</span></p>
                    <p className="card-text text-dark"><i className="fa fa-user text-white" aria-hidden="true"></i> Dr. {session.doctors.firstname+" "+session.doctors.lastname}  is presently on session with {session.users.firstname+" "+session.users.lastname}</p>
                        
                    <p className="card-text text-dark">Session started : <Moment fromNow>{session.sessions.start}</Moment></p>
                    <i className="fa fa-eye fa-2x text-dark float-right" aria-hidden="true" />                      
                    </div>
                </div>
               
        })    

    return( 
        <div className="container-fluid">
            
            <Loading display={display}/>
            <div className="top-margin-sm">
                
            <ChatOngoingSessionRead 
                    clicked={(event)=>reverseDisplay(event)}
                    display={sessionFullDisplay.display} 
                    userId={sessionFullDetails.userId}
                    username={sessionFullDetails.username} 
                    usermail={sessionFullDetails.usermail}
                    doctorId={sessionFullDetails.doctorId}
                    doctorname={sessionFullDetails.doctorname} 
                    doctormail={sessionFullDetails.doctormail}
                    complains={sessionFullDetails.complains}
                    sessionDate={sessionFullDetails.sessionDate}
                    sessionId={sessionFullDetails.sessionId}
                />
            </div>
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="">
                        <div className="card-body">
                            <div className="card  position-fixed fixed-top">
                                <div className="card-body text-dark">
                                    <div className="row justify-content-between">
                                        <div className="col-2">
                                        <Link to="/doctor/dashboard">
                                            <i className="fa fa-arrow-left text-dark fa-lg" aria-hidden="false"></i>
                                        </Link>
                                        </div>
                                        <div className="col-2">
                                            <Link to="/doctor/sessions/waiting">
                                                <i className="fas fa-hourglass fa-2x text-dark" aria-hidden="true"></i>
                                            </Link>
                                        </div> 
                                        
                                        <div>
                                            <Link to="/doctor/sessions/ongoing">
                                                <i className="fa fa-tasks fa-2x  chat-dashboard-active" aria-hidden="true"></i>
                                            </Link>
                                        </div> 
                                        <div className="col-2">
                                            <Link to="/chat/doctors/doctor">
                                                <i  id="newMessage" className="fa fa-plus-circle fa-2x text-dark"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-2">
                                            <Link to="/chat/notifications">
                                            <i  id="bell" className="fa fa-bell fa-2x text-dark" aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat">
                                  
                            <h2 className="text-center top-margin-lg">Ongoing Sessions</h2>                          
                            <div className={alert.alertDisplay}>
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
                            </div>
                            <div className=""> 
                                <div className={alert.sessionDisplay}>
                                    {sessionDetails}   
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

export default ChatOngoingSessions;