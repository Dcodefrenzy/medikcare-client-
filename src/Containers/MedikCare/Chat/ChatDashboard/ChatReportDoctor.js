import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DoctorLoginSession from "../../Medicals/Doctors/DoctorsLogins/LoginSession";
import io from 'socket.io-client';
import Loading from "../../Loading/Loading";



const ChatReportDoctor = (props) => {
    const from = props.match.params.id;
    const chatSessionId = props.match.params.sessionId;
    const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
    const [userSession, setUserSession] =useState({})
    const [loading, setLoading] =useState({display:""})
    const [medikImprove, setMedikImprove] = useState({id:"medikImprove",value:""})
    const [diagnose, setDiagnose] = useState({id:"diagnose",value:""})
    const [test, setTest] = useState({id:"test",value:""})
    const [medication, setMedication] = useState({id:"medication",value:""})
    const [complains, setComplains] = useState({id:"complains",value:""})
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""})
    const [loginSession, setLoginSession] = useState({display:"display-none"})
        
    const setDiagnoseHandler =(event)=>{ setDiagnose({id:"diagnose", value:event.target.value}) }
    const setComplainsHandler =(event)=>{ setComplains({id:"complains", value:event.target.value}) }
    const setTestHandler =(event)=>{ setTest({id:"test", value:event.target.value}) }
    const setMedicationHandler =(event)=>{ setMedication({id:"medication", value:event.target.value}) }
    const checkSession = ()=>{
        if (sessionItem === null) {
            setLoginSession({display:"row"})
        }else{
            fetchUserHandeller();
        }
    }

    const fetchUserHandeller = () => {
        const id = props.match.params.id
         const url = "/api/v1/user/doctor/"+id;
         fetch(url, {
             method:"GET",
             headers:{"Content-Type":"application/json", "u-auth":sessionItem.token}
         })
         .then(res => res.json())
         .then(response =>{console.log(response)
             if(response.status === 401) {
                 sessionStorage.removeItem("doctor");
                 setLoginSession({display:"row"});
             }else if(response.status === 200){
                setLoading({display:"display-none"});
               setUserSession(response.message);
             }
         })
     }  

    let port ="";
    if (process.env.NODE_ENV !== 'production') {
		 port =  "http://localhost:7979"
	  }else if(process.env.NODE_ENV === 'production'){
            port =    "";
      }

    
    const socket = io(port,{transports: ['websocket']});

   const submitChatMetricHandler=(event)=>{
        event.preventDefault();  
      
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})
            const report = {"complains":complains.value,
                            "diagnoses":diagnose.value, 
                            "test":test.value,
                            "medication":medication.value, 
                            "chatSessionId":userSession._id,
                            "_userId":from, 
                            "_doctorId":sessionItem._id
                        }
                        console.log(report);
            const url = "/api/v1/doctor/report/add"
            fetch(url, {
                method: "POST",
                body:JSON.stringify(report),
                headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
            })
            .then(res => res.json())
            .then(response => { console.log(response)
                if(response.status === 401) {
                    sessionStorage.removeItem("doctor");
                    setLoginSession({display:"row"})
                }else if (response.status === 201) {
                    const sessionData = {"from":sessionItem._id, "to":from};
                    socket.emit("end session", sessionData);
                }else if (response.status === 200) { 
                    const sessionData = {"from":sessionItem._id, "to":from};
                    socket.emit("end session", sessionData);
                }
            })
    }

    
    socket.on("end session", (dataset)=>{
       setAlert({alertDisplay:"row", spinnerDisplay:"display-none", formDisplay:"display-none"})
    })
    
    useEffect(()=>{
        checkSession();
    }, [])
    return(
    <div className={props.display}>
        <Loading display={loading.display} />
        <div className="col-12 col-sm-12 col-md-12 bg-dark">
            <div className="card b-medik">
                <div className="top-margin-md  section">
                    <div className="row justify-content-center align-items-center text-white">
                        
                <div className="container verification">
                    <div className={alert.alertDisplay}>
                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
                            <div className="card b-medik">
                                <div className="card-body">
                                    <h3 className="text-white">Verification</h3>
                                    <h1 className="text-center top-margin-md">😎</h1>
                                    <p className="top-margin-md text-white">Thank you for filling the report and Feedback, This will go a long way in creating a better experince on our application for everyone.👍</p>
                                   <div className="col-10 offset-3 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4 top-margin-md"> 
                                        <Link to="/doctor/dashboard">
                                                <button className="btn btn-medik top-margin-md">Go to dashboard</button>
                                            </Link>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={` ${alert.formDisplay}`}>
                        
                        <DoctorLoginSession display={loginSession.display}/>
                                <div className="card-body">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h2>Patient Medical Report</h2>
                                        <p className="top-margin-sm">Please spare a minute to fill this</p>
                                    <form onSubmit={submitChatMetricHandler}>
                                    <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Patient Complains <span className="text-danger"></span></label>
                                                   <textarea id={complains.id} onChange={(event)=>setComplainsHandler(event, complains.id)} className="form-control" placeholder="patient complains" required></textarea>
                                                </div>
                                             
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Diagnoses <span className="text-danger"></span></label>
                                                   <textarea id={diagnose.id} onChange={(event)=>setDiagnoseHandler(event, diagnose.id)} className="form-control" placeholder="Patient diagnosis" required></textarea>
                                                </div>
                                             
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Tests <span className="text-danger"></span></label>
                                                   <textarea id={test.id} onChange={(event)=>setTestHandler(event, test.id)} className="form-control" placeholder="eg 1) kidney function test." required></textarea>
                                                </div> 
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Medications <span className="text-danger"></span></label>
                                                   <textarea id={medication.id} onChange={(event)=>setMedicationHandler(event, medication.id)} className="form-control" placeholder="eg, 1) paracetamol" required></textarea>
                                                </div> 
                                            </div> 
                                        </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className={alert.spinnerDisplay}>
                                                <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                            </div>
                                            <div className="form-group">
                                                <input className="btn-medik form-control" type="submit" name="Submit" value="submit"/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                     </form>
                                    </div>
                                   
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChatReportDoctor;