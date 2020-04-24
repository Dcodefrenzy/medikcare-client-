import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';
import ChatSession from './ChatSession';
import { Link } from 'react-router-dom';
import LoginSession from '../../Users/Logins/LoginSession';




const ChatDashbordNewChat = (props) =>{
    const [doctors, displayDoctors] = useState([])
    const session = JSON.parse(sessionStorage.getItem("user"));
    const   [alert, setAlert]= useState({buttonDisplay:"block", spinnerDisplay:""})
    const [loginSession, setLoginSession] = useState({display:"display-none"})
  
    const getSession = ()=> {
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        if( sessionItemUser === null) {
            setLoginSession({display:"row"})
        }else{
            
        checkSession();
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
                sessionStorage.removeItem("user");
                setLoginSession({display:"row"})
                
            }else if(response.status === 200){
                console.log(response);
            setAlert({buttonDisplay:"display-none", spinnerDisplay:"display-none"})
                displayDoctors(response.message)
            }
        })
    }
    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979";
	  }else if(process.env.NODE_ENV === 'production'){
            port =    "";
      }

    
      const socket = io(port,{transports: ['websocket']});
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
    }, [])

    const doctor = doctors.map((doctor)=>{
                const online = doctor.loginStatus === true?"text-success":"text-danger"
      return     <Link to={"/chat/session/"+doctor._id} key={doctor._id}>
                <div className="card bottom-margin-sm">
                    <div className="card-body text-dark">
                        <i className={`fa fa-circle ${online} float-right`} aria-hidden="true"></i>
                        <h6 className="card-text text-dark"><i className="fa fa-user" aria-hidden="true"></i> Dr {doctor.firstname+" "+doctor.lastname}</h6>
                        <p><b>{doctor.gender}</b></p>
                        <i className={` float-right`} aria-hidden="true"> <b>&#8358; 0</b></i> 
                            <i className="fa fa-envelope fa-2x  medik-color" aria-hidden="true" />                       
                    </div>
                </div>
                </Link>
        })
    return( 
        <div className="container-fluid">
        <LoginSession display={loginSession.display} /> 
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="">
                        <div className="card-body">
                            <div className="card  position-fixed fixed-top">
                                <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <Link to="/user/dashboard">
                                            <i className="fa fa-arrow-left fa-lg text-dark" aria-hidden="false"></i>
                                        </Link>  
                                        <div className="col-3">
                                            <Link to="/chat/doctors">
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
                            <div className="chat top-margin-lg">
                                        <div className={"text-center "+alert.spinnerDisplay}>
                                         <i className="fa fa-spinner fa-pulse medik-color fa-3x"></i>
                                        </div>
                                        <div className="">
                                            <h6 className="text-dark text-center">Doctors</h6>
                                                    {doctor}
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