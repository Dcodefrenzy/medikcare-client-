import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DoctorLoginSession from '../../Medicals/Doctors/DoctorsLogins/LoginSession';
import Loading from '../../Loading/Loading';




const ChatWaitingList = (props) =>{
    const [sessions, displaySession] = useState([]);
    const [newSession, setNewSession] = useState([]);
    const [doctorSession, setDoctorSession] = useState({display:"display-none"})
         
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [display, setDIsplay] = useState("")
    const   [alert, setAlert]= useState({newSessionDisplay:"display-none", sessionDisplay:"display-none",buttonDisplay:"display-none", alertDisplay:"display-none", spinnerDisplay:"display-none"})
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
                setDIsplay("display-none");
                setAlert({ newSessionDisplay:"display-none",sessionDisplay:"display-none",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})
            }else if (response.status === 200) {
                setDIsplay("display-none");
                if (response.message.length < 1) {
                    setAlert({newSessionDisplay:"display-none", sessionDisplay:"top-margin-md",buttonDisplay:"display-none", alertDisplay:"", spinnerDisplay:"display-none"})

                }else{
                    setAlert({newSessionDisplay:"top-margin-md", sessionDisplay:"top-margin-md",buttonDisplay:"display-none", alertDisplay:"display-none", spinnerDisplay:"display-none"})
                    setNewSession(response.message);
                }
            }
        })
    }


    useEffect(()=>{
        getSession();   
         fetchSessions();
    }, [])

   
        const newSessionDetails = newSession.map((newSession)=>{
            let color
            if (newSession.session.emergencyLevel == 1) {
                newSession.session.emergencyLevel = "Not Critical";
                color = "text-primary"
            }else if (newSession.session.emergencyLevel == 2) {
                newSession.session.emergencyLevel = "Managable";
                color = "text-warning";
            }else if (newSession.session.emergencyLevel == 3) {
                newSession.session.emergencyLevel = "Critical";
                color = "text-danger";
            }
            return    <Link to={`/chat/session/${newSession.session.userId}/${newSession.session._id}`} key={newSession.session._id}>
                      <div className="card box-shadow">
                          <div className="card-body text-dark">
                              <span className="card-text text-dark">Patient Complains:</span>
                            <p>{newSession.session.complain}</p>
                              <span className="card-text text-dark">Consultation Means:</span>
                            <p className="text-success">{newSession.session.means}</p>
                            <p className="card-text text-dark"><i className="fa fa-clock"></i> <Moment fromNow>{newSession.session.createdAt}</Moment></p>                           
                             <button className="btn btn-sm btn-success">Proceed</button>  
                            <span className={`${color} float-right`} aria-hidden="true"><b className="text-dark">Emergency level: </b>{newSession.session.emergencyLevel}</span>                    
                          </div>
                      </div>
                      </Link> 
              })
    return( 
        <div className="container-fluid">
            
            <Loading display={display}/>
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
                                                <i className="fa fa-tasks fa-2x text-dark" aria-hidden="true"></i>
                                            </Link>
                                        </div> 
                                        <div className="col-2">
                                            <Link to="/chat/doctors/doctor">
                                                <i  id="newMessage" className="fa fa-plus-circle fa-2x chat-dashboard-active"> </i>
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
                            <div className="chat top-margin-lg">
                            <h2 className="text-center">Patient Waiting List</h2>              
                            <div className={alert.alertDisplay}>
                                <div className="container verification section">
                                    <div>
                                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
                                            <div className="">
                                                <div className="card-body">
                                                    <h3 className="text-dark">No Sessions Yet</h3>
                                                    <p className="top-margin-md text-dark">There are no sessions yet, you can check back in the next hour.👍</p>
                                                    <div className="col-12 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4 top-margin-sm"> 
                                                        <Link to="/doctor/dashboard">
                                                            <button className="btn btn-medik top-margin-md">dashboard</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="top-margin-lg">
                                <div className={alert.newSessionDisplay}>
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

export default ChatWaitingList;