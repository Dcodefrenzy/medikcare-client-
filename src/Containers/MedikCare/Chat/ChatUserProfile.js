import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DoctorLoginSession from '../Medicals/Doctors/DoctorsLogins/LoginSession';


const ChatUserProfile = (props) =>{
    const [user, displayUser] = useState({});
    const [userSession, setUserSession] =useState({})
    const [userReports, setUserReports] = useState([]);
    const [report, setUserReport] = useState({});
    const [file, setFile] = useState({});
    const [doctorSession, setDoctorSession] = useState({display:"display-none"})
    const session = JSON.parse(sessionStorage.getItem("doctor"));
    const   [alert, setAlert]= useState({buttonDisplay:"block", spinnerDisplay:"display-none"})
    const [reportDisplay, setReportDisplay] = useState({display:"display-none"})



    const authentication =()=>{
        if(session === null) {
            setDoctorSession({display:"row"});
        }else{
            fetchUserHandeller();
        }
    }
    const fetchUserHandeller = () => {
       const id = props.match.params.id
        const url = "/api/v1/user/doctor/"+id;
        fetch(url, {
            method:"GET",
            headers:{"Content-Type":"application/json", "u-auth":session.token}
        })
        .then(res => res.json())
        .then(response =>{//console.log(response)
            if(response.status === 401) {
                sessionStorage.removeItem("doctor");
                setDoctorSession({display:"row"});
            }else if(response.status === 200){
                //console.log(response)
                if (response.message.emergencyLevel === 1) {
                    response.message.emergencyLevel = "Not Critical";
                    response.message.color = "text-primary";
                }else if (response.message.emergencyLevel === 2) {
                    response.message.emergencyLevel = "Managable";
                    response.message.color = "text-warning";
                }else if (response.message.emergencyLevel === 3) {
                    response.message.emergencyLevel = "Critical";
                    response.message.color = "text-danger";
                }
              displayUser(response.user);
              setUserSession(response.message)
              setUserReports(response.reports)
                //setFile(response.message._doctorId.image)
            }
        })
    }  
    
    
const setReportsHandler = (event, id)=>{
    const url = "/api/v1/user/doctor/report/"+id;
    fetch(url, {
        method: "GET",
        headers: {'Content-Type': "application/json", "u-auth": session.token}
    })
    .then(res=>res.json())
    .then(response => {
        if (response.status === 200) {
            setReportDisplay({display:"card fixed top-padding-sm"})
            response.message.doctor = response.doctor
            setUserReport(response.message)
           // console.log(response)
        }else if(response.status === 401) {
            
            sessionStorage.removeItem("doctor");
            setDoctorSession({display:"row"});
        }
    })
}


const endReportDisplay = (event)=>{
    event.preventDefault();

    setReportDisplay({display:"display-none"})
}



    useEffect(()=>{
        authentication();
    }, [])
    const UserReport =  userReports.map((report)=>{
        return  <div className="card bottom-margin-sm" key={report._id} onClick={event => setReportsHandler(event, report._id)}>
                    <div className="card-body">
                        <div className="row">
    
                            <div className="col-12 col-sm-6 col-md-8">
                                <h6 className="text-dark">Diagnoses: {report.diagnoses}</h6>
                                <p className="text-dark top-margin-sm"><Moment fromNow>{report.dateCreated}</Moment></p>                                                        
                            </div>
                        </div>
                    </div>
                </div>
              })
    return(  
            <div className="container-fluid"> 
            <DoctorLoginSession display={doctorSession.display} />
                <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                    <div className={reportDisplay.display}>
                        <span className="fa fa-times fa-3x float-right" onClick={event=> endReportDisplay(event)}></span>
                    <main className="card bottom-margin-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8">
                                        <h3 className="text-dark">User Health Report</h3>
                                        <h6 className="text-success"><b className="text-dark">Report By-</b> {report.doctor}</h6>
                                        <p className="text-dark top-margin-sm"><Moment fromNow>{report.dateCreated}</Moment></p> 
                                        <small>Health complain</small>  
                                        <p>{report.complains}</p> 
                                        <small className="text-dark">Doctors Diagnoses</small>
                                        <p>{report.diagnoses}</p>  
                                        <small className="text-dark">Doctors Medication</small>
                                        <p>{report.medication}</p>   
                                        <small className="text-dark">Lab Test</small>
                                        <p>{report.test}</p>                                                   
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>  
                <div className="top-margin-sm">
                    <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                            <div className="justify-content-center medik-color">
                            <div className="col-12 col-sm-12 col-md-12">
                                <Link to={"/chat/"+props.match.params.id}> 
                                    <button className="btn-sm btn-medik">Go back</button>
                                </Link>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="card">
                                        <div className="card-header b-medik text-white">
                                            <h6>Patient Details</h6>
                                        </div>
                                        <div className="card-body">
                                           <div className="row">
                                           <div className="col-12 col-sm-5 col-md-5">
                                                <p>{user.firstname+" "+user.lastname}</p>
                                                <p className="float-right"><b>{user.gender}</b></p>
                                                <p className=""><b>Age:</b> <Moment fromNow>{user.age}</Moment></p>
                                                <p className={userSession.color}><b className="text-dark">Emergency Level: </b>{userSession.emergencyLevel}</p>
                                                
                                                <p className="">{userSession.complain}</p>
                                           </div>
                                           </div>
                                        </div>
                                    </div>
                                <div className="top-margin-md">
                                    <h6>Patient Health Reports</h6>
                                    {UserReport}
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    )
}

export default ChatUserProfile;