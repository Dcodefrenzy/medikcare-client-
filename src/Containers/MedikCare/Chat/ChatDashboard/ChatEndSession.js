import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Loading from "../../Loading/Loading";
import {socket} from '../../Socket/Socket';
import DoctorLoginSession from "../../Medicals/Doctors/DoctorsLogins/LoginSession";



const ChatEndSession = (props)=>{
    const from = props.match.params.id;
    const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
    const [session, setUserSession] =  useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] =useState({display:""})
    const [loginSession, setLoginSession] = useState({display:"display-none"});
    const [report, setReport] = useState({complains:"No complains", diagnoses:"No diagnoses filled", plan:"No doctors plan filled"});
    const [drugList, setDrugList] = useState([{_id:"1",name:"No drug added",duration:"-",interval:"-"}]);
    const [testList, setTestList] = useState([{_id:"1",name:"No test added"}]);

    const checkSession = ()=>{
        if (sessionItem === null) {
            setLoginSession({display:"row"})
        }else{
            fetchUserHandeller();
        }
    }

    const fetchUserHandeller = () => {
         const url = "/api/v1/chatSession/read-user/"+from;
         fetch(url, {
             method:"GET",
             headers:{"Content-Type":"application/json", "u-auth":sessionItem.token}
         })
         .then(res => res.json())
         .then(response =>{
             if(response.status === 401) {
                 sessionStorage.removeItem("doctor");
                 setLoginSession({display:"row"});
             }else if(response.status === 200){
                setLoading({display:"display-none"});
                console.log( response.report)
                setUserSession(response.session);
                setUser(response.user)
               if (response.report !== null) {
                    setReport(response.report);
                    if(response.report.drugs > 0){
                    setDrugList(response.report.drugs)
                    }
                    if (response.report.labTest > 0) {
                    setTestList(response.report.labTest);
                    }
               }
             }else if (response.status === 403) {
                 window.location = "/doctor/sessions/waiting";
             }
         })
     } 
    const endSession = (event)=>{
        event.preventDefault();
        console.log(session._id)
        const sessionData = {"from":sessionItem._id, "to":from, "session":session._id};
        socket.emit("end session", sessionData);
    }
    



         
    useEffect(()=>{
        checkSession();
        socket.on("end session", (session, _userId)=>{
            console.log(session)
            const url = "/api/v1/doctor/session/end";
                fetch(url, {
                    body:JSON.stringify({"chatSessionId":session, "_userId":from}),
                    method:"POST",
                    headers:{"Content-Type":"application/json", "u-auth":sessionItem.token}
                })
                .then(res=>res.json())
                .then(response=>{
                    alert("Session ended successfully.");
                    window.location ="/chat/doctors/doctor";
                })
            //setAlert({alertDisplay:"row", spinnerDisplay:"display-none", formDisplay:"display-none"})
         });
    }, []);

    const drugTest = drugList.map((list, index)=>{
        return <li key={list._id}>{list.name} {list.interval}/daily {list.duration}/days </li>
                
});

const labTest = testList.map((list, )=>{
    return  <li key={list._id}>{list.name}</li>
})

     return (
         <div className="col-12 col-sm-12 col-md-12">
             <div className="card opacity fixed">
                 <section className="card-body">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 top-margin-lg">
                        <div className="card bg-dark">
                            <div className="card-body text-white  home-content">
                            <Link to={`/chat/${from}`}><span className="fa fa-arrow-left  text-white"></span></Link>
                                <h1>End Session</h1>
                                <p>Do you want to end session with {user.firstname+" "+user.lastname}</p>
                                <h6>Report details</h6>
                                <p>complains: {report.complains}</p>
                                <p>diagnoses: {report.diagnoses}</p>
                                <p>Doctors plan{report.plan}</p>
                                <ul>
                                    Tests
                                    {labTest}
                                </ul>
                                <ul>
                                    Drugs
                                    {drugTest}
                                </ul>
                                <button onClick={event=>endSession(event)} className="btn-lg btn-success m-1">End Session</button>
                            </div>
                        </div>
                    </div>
                 </section>]
             </div>
             <DoctorLoginSession display="display-none" />
         </div>
     )

}

export default  ChatEndSession