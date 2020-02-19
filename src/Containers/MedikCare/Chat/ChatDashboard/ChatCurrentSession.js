import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from './ChatDashboard';
import io from 'socket.io-client';
import ChatSession from './ChatSession';
import { Link } from 'react-router-dom';
import doctorProfile from '../../Medicals/Doctors/Profile/Profile';


const chatCurrentsession = (props) =>{
    const id = props.match.params.id

    const [doctor, displayDoctor] = useState([]);
    const [doctorInfo, displayDoctorInfo] = useState([]);
    const [file, setFile] = useState({});
    const session = JSON.parse(sessionStorage.getItem("user"));
    const   [alert, setAlert]= useState({buttonDisplay:"block", spinnerDisplay:"display-none"})

    const getSession = ()=> {
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        if( sessionItemUser === null) {
            window.location ="/not-found"
        }
    }

    const fetchDoctorsHandeller = () => {
         const url = "/api/v1/doctors/records/user/doctor/"+id;
         fetch(url, {
             method:"GET",
             headers:{"Content-Type":"application/json", "u-auth":session.token}
         })
         .then(res => res.json())
         .then(response =>{
             if(response.status === 401) {
                 if(session.isUser === true) {
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
          port =  "http://localhost:7979/socket";
       }else if(process.env.NODE_ENV === 'production'){
        port =    "";
       }
 
     
     const socket = io(port);
    const endSession=(event)=>{
        event.preventDefault();
        const session = JSON.parse(sessionStorage.getItem("user"));
        const sessionData = {"from":session._id, "to":id};  
        socket.emit("end session", sessionData);
    }
    socket.on("end session", (dataset, sessionData)=>{
        console.log(dataset)
        console.log(sessionData)
        window.location = "/chat/feedback/"+dataset.to+"/"+sessionData._id;
    })


    useEffect(()=>{
        getSession();
        fetchDoctorsHandeller();
    }, [])

   
    return(  
        <div className="container-fluid">     
        <section>
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="justify-content-center medik-color">
                    <div className="col-12 col-sm-12 col-md-12">
                        <Link to="/chat/dashboard"> 
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
                                               <p className="text-dark">You are still on a session with {doctor.firstname+" "+doctor.lastname}, do you want to End or Continue your session? </p>
                                                    <div className={alert.spinnerDisplay}>
                                                        <i className="fa fa-spinner fa-pulse fa-3x"></i>
                                                    </div>
                                                    <div className={alert.buttonDisplay}>   
                                                        <button onClick={(event)=>endSession(event)} className="btn-sm btn-warning">End</button>
                                                        <Link to={"/chat/"+doctor._id}><button className="btn-sm btn-success" id={doctor._id}>Continue</button></Link>
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

export default chatCurrentsession;