import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';


const ChatDashbordNewChat = (props) =>{
    const [doctors, displayDoctors] = useState([])
    const session = useContext(SessionContext);

    const fetchDoctorsHandeller = () => {
        const url = "http://192.168.33.12:3000/api/v1/doctor/user/doctors";
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
                displayDoctors(response.message)
            }
        })
    }
    const socket = io("http://localhost:8080");
    const startSessionHander = (event, id)=>{

            event.preventDefault();
            socket.emit("session start", session._id, id);
    }
    socket.on('create session', (from, to)=>{
        console.log(to)
        
    })

    useEffect(()=>{
        fetchDoctorsHandeller();
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
                        <i className="fa fa-envelope fa-2x float-right" onClick={(event)=>startSessionHander(event, doctor._id)} id={doctor._id} aria-hidden="true" />                   
                    </div>
                </div>
        })
    return(  
        <div className={props.display}>
            <h1 className="text-dark text-center">Doctors</h1>
                    {doctor}
                <div className="card b-medik top-margin-sm">
                    <div className="card-body text-white">
                    <h1 className="text-center">More..</h1>
                    </div>
                </div>
        </div>
    )
}

export default ChatDashbordNewChat;