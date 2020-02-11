import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';
import ChatSession from './ChatSession';
import { Link } from 'react-router-dom';




const ChatDashbordNewChat = (props) =>{
    const [doctors, displayDoctors] = useState([])
    const session = JSON.parse(sessionStorage.getItem("user"));
    const   [alert, setAlert]= useState({buttonDisplay:"block", spinnerDisplay:""})
  
    const getSession = ()=> {
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        if( sessionItemUser === null) {
            window.history.back();
        }
    }

    const fetchDoctorsHandeller = () => {
        const url = "/api/v1/doctor/user/doctors";
        fetch(url, {
            method:"GET",
            headers:{"Content-Type":"application/json", "u-auth":session.token}
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
                
            setAlert({buttonDisplay:"display-none", spinnerDisplay:"display-none"})
                displayDoctors(response.message)
            }
        })
    }
    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979/chat";
	  }else if(process.env.NODE_ENV === 'production'){
         port =    "/chat/socket.io";
      }

    
    const socket = io(port);
   const checkSession =()=>{
        socket.emit("check session", session._id);
    }
    socket.on("check session", (checkSession)=>{
        //console.log(checkSession)
        if(!checkSession ) {
            fetchDoctorsHandeller();
        }else{
            let id ="";
            if (session._id === checkSession.from) {
                id = checkSession.to;
                window.location = "/chat/current/session/"+id;
            }else if(session._id === checkSession.to) {
                id = checkSession.from;      
            window.location = "/chat/current/session/"+id;
            }
        }
        
    })


    useEffect(()=>{
        getSession();
        checkSession();
    }, [])

    const doctor = doctors.map((doctor)=>{
                const online = doctor.loginStatus === true?"text-success":"text-danger"
      return    <div className="card b-medik" key={doctor._id}>
                    <div className="card-body text-white">
                    <i className={`fa fa-circle ${online} float-right`} aria-hidden="true"></i>
                        <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr {doctor.firstname+" "+doctor.lastname}</h3>
                        <p className="">Medicine and Surgery</p>
                        <span className="card-text">
                            <i className="fa fa-star fa-2x" aria-hidden="true"></i> 
                            <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                            <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                            <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                            <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        </span> 
                        <Link to={"/chat/session/"+doctor._id}>
                            <i className="fa fa-envelope fa-2x float-right text-white" aria-hidden="true" />                   
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
                                        <Link to="/user/dashboard">
                                            <i className="fa fa-arrow-left fa-lg text-white" aria-hidden="false"> Back</i>
                                        </Link>
                                        <div className="col-3">
                                            <Link to="/chat/dashboard">
                                                <i  id="bell" className="fa fa-bell fa-3x text-white" aria-hidden="true"></i>
                                            </Link>
                                        </div>   
                                        <div className="col-3">
                                            <Link to="/chat/doctors">
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
                                            <h1 className="text-dark text-center">Doctors</h1>
                                                    {doctor}
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

export default ChatDashbordNewChat;