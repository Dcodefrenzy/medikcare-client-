import React,  { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DoctorLoginSession from '../Medicals/Doctors/DoctorsLogins/LoginSession';
import LoginSession from '../Users/Logins/LoginSession';
import {socket} from '../Socket/Socket';

const ChatAppointment = (props) => {
    const sessionId  = props.match.params.sessionId
    const appointmentId  = props.match.params.appointmentId
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [doctorSession, setDoctorSession] = useState({display:"display-none"});
    const [loginSession, setLoginSession] = useState({display:"display-none"});
    const [response, setResponse] = useState({});
    const [appointment, setAppointment] = useState({});

    const fetchAppointment = ()=>{
        let url, session;
        if (sessionItemUser === null && sessionItemDoctor !== null) {
            url = `/api/v1/appointment/doctor/read/${appointmentId}/${sessionId}`;
            session = sessionItemDoctor;
        }else if (sessionItemDoctor === null && sessionItemUser !== null) {
            url = `/api/v1/appointment/user/read/${appointmentId}/${sessionId}`;
            session = sessionItemUser;
        }

        fetch(url, {
            method:"GET",
            headers:{"Content-Type":"application/json", "u-auth":session.token}
        }).then(res => res.json())
        .then((response)=>{
            if(response.status === 401 && sessionItemDoctor !== null) {
                sessionStorage.removeItem("doctor");
                setDoctorSession({display:"row"});
            }else if (response.status === 401 && sessionItemUser !== null) {
                sessionStorage.removeItem("user");
                setLoginSession({display:"row"});
            }else if (response.status === 201) {
                setAppointment(response.appointment)
                setResponse(response)
            }else if (response.status === 403 && sessionItemDoctor !== null) {
                
            window.location = "/chat/"+response.appointment.user;
            }else if (response.status === 403 && sessionItemUser !== null) {
                
                window.location = "/chat/"+response.appointment.doctor;
            }
            console.log(response);
        })
    }
    const startsession = (event)=>{
            event.preventDefault();
        socket.emit("session start", appointment.doctor, appointment.user, "This is a follow up medical consultation please refer to what you discussed previousl");
    }

    useEffect(()=>{
        fetchAppointment();
        socket.on('create session', (from, to)=>{
            let url, session, chatId;
            
            if (sessionItemUser === null && sessionItemDoctor !== null) {
                url = `/api/v1/appointment/doctor/start/${appointmentId}`;
                session = sessionItemDoctor;
                chatId = to;
            }else if (sessionItemDoctor === null && sessionItemUser !== null) {
                url = `/api/v1/appointment/user/start/${appointmentId}`;
                session = sessionItemUser;
                chatId = from;
            }
            fetch(url, {
                method:"PATCH",
                headers:{"Content-Type":"application/json", "u-auth":session.token}
            })
            .then(res => res.json())
            .then((response)=>{
                console.log(response)
            })
            window.location = "/chat/"+chatId;
          
        })
    }, [])

  return (
        <div>
            <LoginSession display={loginSession.display} /> 
            <DoctorLoginSession display={doctorSession.display} />
            <div className="col-12 col-sm-12 col-md-12">
                <div className="card opacity fixed b-medik">
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed mt-5">
                    <main className="card top-margin-md">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 top-margin-md">
                                    <h3>Chat Appointment Notification</h3>
                                </div>
                                <div className="col-12 top-margin-md">
                                    <h5>Your appointment with {response.name} will start by  <Moment fromNow>{appointment.appointmentDate}</Moment></h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 offset-md-3 top-margin-sm">   
                                    <h5 onClick={event=> startsession(event)}  className="card-body btn-medik text-center">Start Session</h5>
                                </div>
                            </div>
                        </div>
                    </main>
            </div>
        </div>
  )
}

export default ChatAppointment;