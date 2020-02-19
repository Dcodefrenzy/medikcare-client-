import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';


const ChatSession = (props) =>{
    const [doctor, displayDoctor] = useState([]);
    const [doctorInfo, displayDoctorInfo] = useState([]);
    const [file, setFile] = useState({});
    const session = JSON.parse(sessionStorage.getItem("user"));
    const   [alert, setAlert]= useState({buttonDisplay:"block", spinnerDisplay:"display-none"})


    const fetchDoctorsHandeller = () => {
       const id = props.match.params.id
        const url = "/api/v1/doctors/records/user/doctor/"+id;
        fetch(url, {
            method:"GET",
            headers:{"Content-Type":"application/json", "u-auth":session.token}
        })
        .then(res => res.json())
        .then(response =>{console.log(response)
            if(response.status === 401) {
                if(session.isUser === false){
                 sessionStorage.removeItem("doctor");
                   window.location = "/doctor/login?Session expired please login.";
                }else if(session.isUser === true) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login.";
                }
            }else if(response.status === 200){
                displayDoctor(response.message._doctorId);
                displayDoctorInfo(response.message)
                             
                if (response.message._doctorId.image) {
                    setFile(response.message._doctorId.image);
                }else{
                    setFile({filename:"user.png"});
                }
                //setFile(response.message._doctorId.image)
            }
        })
    }       
    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979/socket"
	  }else if(process.env.NODE_ENV === 'production'){
         port =    "";
      }

    
    const socket = io(port);
    const startSessionHander = (event, id)=>{
            event.preventDefault();
            setAlert({buttonDisplay:"display-none", spinnerDisplay:"block"})
            socket.emit("session start", session._id, id);
    }
    socket.on('create session', (from, to)=>{
        const id = props.match.params.id
        const url = "/api/v1/doctor/chat/session/"+id;
    
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
                    window.location = "/chat/"+response._id;
                }
            })
        
    })

    useEffect(()=>{
        fetchDoctorsHandeller();
    }, [])

    return(  
            <div className="container-fluid">     
                <section>
                    <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                            <div className="justify-content-center medik-color">
                            <div className="col-12 col-sm-12 col-md-12">
                                <Link to="/chat/doctors"> 
                                    <button className="btn-sm btn-medik">Go back</button>
                                </Link>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="card">
                                        <div className="card-header b-medik"></div>
                                        <div className="card-body">
                                           <div className="row">
                                           <div className="col-5 col-sm-5 col-md-5">
                                           <img className="img-thumbnail" width="100%" src={"/Images/"+file.filename} alt="admin-profile-image"/>
                                                <small className="block">{doctorInfo.specialty}</small>
                                           </div>
                                           <div className="col-12 col-sm-6 col-md-6">
                                               <p className="text-dark">Do you want to start a session with Dr {doctor.firstname+" "+doctor.lastname} ?</p>
                                                    <div className={alert.spinnerDisplay}>
                                                        <i className="fa fa-spinner fa-pulse fa-3x"></i>
                                                    </div>
                                                    <div className={alert.buttonDisplay}>   
                                                        <Link to="/chat/doctors"> <button className="btn-sm btn-warning">No</button></Link><button className="btn-sm btn-danger" onClick={(event)=>startSessionHander(event, doctor._id)} id={doctor._id}>Yes</button>
                                                    </div>
                                               </div>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </section>
            </div>
    )
}

export default ChatSession;