import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import DoctorLoginSession from "../../Medicals/Doctors/DoctorsLogins/LoginSession";
import io from 'socket.io-client';
import Loading from "../../Loading/Loading";
import {socket} from '../../Socket/Socket';
import Moment from 'react-moment';
import 'moment-timezone';



const ChatReportDoctor = (props) => {
    const from = props.match.params.id;
    const chatSessionId = props.match.params.sessionId;
    const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
    const [userSession, setUserSession] =useState({})
    const [loading, setLoading] =useState({display:""})
    const [drugName, setDrugName] = useState({id:"drugName",value:""});
    const [drugDuration, setDrugDuration] = useState({id:"drugDuration",value:""});
    const [drugInterval, setDrugInterval] = useState({id:"drugInterval",value:""});
    const [diagnose, setDiagnose] = useState({id:"diagnose",value:""});
    const [test, setTest] = useState({id:"test",value:""});
    const [plan, setPlan] = useState({id:"plan", value:"",});
    const [appointmentDate, setAppointment] = useState({id:"appointment", value:"",});
    const [complains, setComplains] = useState({id:"complains",value:""});
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""});
    const [loginSession, setLoginSession] = useState({display:"display-none"});
    const [drugList, setDrugList] = useState([{_id:"1",name:"",duration:"",interval:""}]);
    const [testList, setTestList] = useState([{_id:"1",name:""}]);
        
    const setDiagnoseHandler =(event)=>{ setDiagnose({id:"diagnose", value:event.target.value}) }
    const setComplainsHandler =(event)=>{ setComplains({id:"complains", value:event.target.value}) }
    const setTestHandler =(event)=>{ setTest({id:"test", value:event.target.value}) }
    const setDrugNameHandller =(event)=>{ setDrugName({id:"drugName", value:event.target.value}) }
    const setDrugDurationHandller =(event)=>{ setDrugDuration({id:"drugDuration", value:event.target.value}) }
    const setDrugIntervalHandller =(event)=>{ setDrugInterval({id:"drugInterval", value:event.target.value}) }
    const setPlanHandler =(event)=>{ setPlan({id:"plan", value:event.target.value}) }
    const setAppointmentHandler =(event)=>{ setAppointment({id:"appointment", value:event.target.value}) }
    const checkSession = ()=>{
        if (sessionItem === null) {
            setLoginSession({display:"row"})
        }else{
            fetchUserHandeller();
        }
    }

    const fetchUserHandeller = () => {
        const id = props.match.params.id
         const url = "/api/v1/chatSession/read-user/"+id;
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
                if (response.report) { 
                    setComplains({id:complains, value:response.report.complains});
                    setDiagnose({id:"diagnose", value:response.report.diagnoses});
                    setPlan({id:"plan", value:response.report.plan});
                    setAppointment({id:"appointment", value:response.report.appointmentDate});
                    setDrugList(response.report.drugs);
                    setTestList(response.report.labTest);
                }
                console.log(response.session)
               setUserSession(response.session);
             }else if (response.status === 403) {
                 window.location = "/doctor/sessions/waiting";
             }
         })
     }  


   const saveReport=(event)=>{
        event.preventDefault();  
      
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})
            const report = {"complains":complains.value,
                            "diagnoses":diagnose.value,  
                            "_sessionId":userSession._id,
                            "_userId":from, 
                            "_doctorId":sessionItem._id,
                            "plan":plan.value,
                            "appointmentDate":appointmentDate.value,
                        }

            const url = "/api/v1/userReport/update/report"
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
                }else if (response.status === 200) { 
                    
        setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""})
                    setComplains({id:complains, value:response.report.complains});
                    setDiagnose({id:"diagnose", value:response.report.diagnoses});
                    setPlan({id:"plan", value:response.report.plan});
                    setAppointment({id:"appointment", value:response.report.appointmentDate});
                    setDrugList(response.report.drugs);
                    setTestList(response.report.labTest);
                }
            })
    }
    const saveTest=(event)=>{
        event.preventDefault();  
      
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})
            const report = {
                            "labTest":test.value,
                            "_sessionId":userSession._id,
                            "_userId":from, 
                            "_doctorId":sessionItem._id,
                        }

            const url = "/api/v1/userReport/update/test"
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
                }else if (response.status === 200) { 
                    setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""})
                    setTestList(response.report.labTest);
                }
            })
    }
    
    const saveDrug =(event)=>{
        event.preventDefault();  
      
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})
            const report = {
                            "name":drugName.value,
                            "interval":drugInterval.value,
                            "duration":drugDuration.value,
                            "_sessionId":userSession._id,
                            "_userId":from, 
                            "_doctorId":sessionItem._id,
                        }

            const url = "/api/v1/userReport/update/drugs"
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
                }else if (response.status === 200) {
                    setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""}) 
                    setDrugList(response.report.drugs);
                }
            })
    }
        
    const deleteDrug =(event, session, id)=>{
        event.preventDefault();  

        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})

            const url = `/api/v1/userReport/delete/drugs/${session}/${id}`
            fetch(url, {
                method: "PATCH",
                headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
            })
            .then(res => res.json())
            .then(response => { console.log(response)
                if(response.status === 401) {
                    sessionStorage.removeItem("doctor");
                    setLoginSession({display:"row"})
                }else if (response.status === 200) {
                    setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""}) 
                    setDrugList(response.report.drugs);
                }
            })
    }

            
    const deleteTest =(event, session, id)=>{
        event.preventDefault();  
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})

            const url = `/api/v1/userReport/delete/test/${session}/${id}`
            fetch(url, {
                method: "PATCH",
                headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
            })
            .then(res => res.json())
            .then(response => { console.log(response)
                if(response.status === 401) {
                    sessionStorage.removeItem("doctor");
                    setLoginSession({display:"row"})
                }else if (response.status === 200) {
                    setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""}) 
                    setTestList(response.report.labTest);
                }
            })
    }

    
    useEffect(()=>{
        checkSession();
    }, []);


    const drugTest = drugList.map((list, index)=>{
            return <li key={list._id}>{list.name} {list.interval}/daily {list.duration}/days <i onClick={event => deleteDrug(event, userSession._id, list._id)} className="fa fa-times text-danger float-right"></i></li>
                    
    });

    const labTest = testList.map((list, )=>{
        return  <li key={list._id}>{list.name} <i onClick={event => deleteTest(event, userSession._id, list._id)} className="fa fa-times text-danger float-right"></i></li>
    })
    return(
    <div className="b-medik">
    <div className={"container"}>
        <Loading display={loading.display} />
        <div className="col-12 col-sm-12 col-md-12">
            <div className="b-medik">
                <div className="p-5 section">
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
                                <div className="card-body row">
                                    <div className="col-12 col-sm-12 col-md-6">
                                        <Link to={`/chat/${from}`}>
                                            <i className="fa fa-arrow-left text-white"></i>
                                        </Link>
                                        <h2>Patient Medical Report</h2>
                                        <p className="top-margin-sm">Please spare a minute to fill this</p>
                                    <form onSubmit={saveReport}>
                                    <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Patient Complains <span className="text-danger"></span></label>
                                                   <textarea id={complains.id} value={complains.value} onChange={(event)=>setComplainsHandler(event, complains.id)} className="form-control" placeholder="patient complains" required></textarea>
                                                </div>
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Diagnoses <span className="text-danger"></span></label>
                                                   <textarea id={diagnose.id} onChange={(event)=>setDiagnoseHandler(event, diagnose.id)} value={diagnose.value} className="form-control" placeholder="Patient diagnosis" required></textarea>
                                                </div>
                                             
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-12">
                                                    <div className="form-group">
                                                        <label>Management Plan <span className="text-danger"></span></label>
                                                        <textarea id={plan.id} onChange={event=> setPlanHandler(event, plan.id)} value={plan.value} className="form-control" placeholder="Write your management plan here" required></textarea>
                                                    </div>
                                            </div> 
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                <label>Next Appointment <span className="text-white">  <Moment>{appointmentDate.value}</Moment></span></label>
                                                   <input type="Date" id={appointmentDate.id} onChange={(event=>setAppointmentHandler(event, appointmentDate.id))} className="form-control" />
                                                </div> 
                                            </div> 
                                        </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className={alert.spinnerDisplay}>
                                                <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                            </div>
                                            <div className="form-group">
                                                <input className="btn-dark form-control" type="submit" name="Save" value="Save"/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                     </form>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6">
                                            <h2>Patient Prescription</h2>
                                            <p className="top-margin-sm">You can save as many test and drugs as possible</p>
                                        <form onSubmit={saveTest}>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <label>Test List</label>
                                                <div className="card box-shadow b-medik">
                                                    <div className="card-body">
                                                        <ul>
                                                        {labTest}
                                                        </ul>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Test <span className="text-danger"></span></label>
                                                    <input type="text" value={test.value} required id={test.id} onChange={event=>setTestHandler(event, test.id)} placeholder="add test here"   className="form-control" />
                                                    </div> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className={alert.spinnerDisplay}>
                                                    <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                                </div>
                                                <div className="form-group">
                                                    <input className="btn-dark form-control" type="submit" name="Save" value="Save test"/>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        </form>     
                                        <form onSubmit={saveDrug}>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <label>Drugs List</label>
                                                    <div className="card box-shadow b-medik">
                                                        <div className="card-body">
                                                            <ul>
                                                                {drugTest}
                                                            </ul>
                                                        </div>
                                                    </div> 
                                                </div>
                                                <div className="col-5 col-sm-4 col-md-4">
                                                        <div className="form-group">
                                                            <label>Drug name<span className="text-danger"></span></label>
                                                            <input type="text" required id={drugName.id} value={drugName.value} onChange={event=>setDrugNameHandller(event, drugName.id)}  placeholder="name"   className="form-control" />
                                                        </div> 
                                                </div>
                                                <div className="col-3 col-sm-4 col-md-3">
                                                        <div className="form-group">
                                                            <label>Duration<span className="text-danger"></span></label>
                                                            <input type="Number" required id={drugDuration.id} value={drugDuration.value} onChange={event=>setDrugDurationHandller(event, drugDuration.id)} placeholder="Duration"   className="form-control" />
                                                        </div> 
                                                </div>
                                                <div className="col-3 col-sm-3 col-md-3">
                                                        <div className="form-group">
                                                            <label>Interval<span className="text-danger"></span></label>
                                                            <input type="Number" required id={drugInterval.id} value={drugInterval.value} onChange={event=>setDrugIntervalHandller(event, drugInterval.id)} placeholder="Interval"   className="form-control" />
                                                        </div> 
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <div className={alert.spinnerDisplay}>
                                                        <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                                    </div>
                                                    <div className="form-group">
                                                        <input className="btn-dark form-control" type="submit" name="Save" value="Save drug"/>
                                                        
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
</div>
        )
}

export default ChatReportDoctor;