import React, {useState, useEffect} from "react" ;
import { Link } from 'react-router-dom';
import LoginSession from "../../Users/Logins/LoginSession";
import {socket} from '../../Socket/Socket';



const ChatCreateSession = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    const [complain, setComplain] = useState({id:"complain",value:""})
    const [emergency, setEmergency] = useState({id:"emergency",value:""})
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-block", formDisplay:"display-none"})
    const [loginSession, setLoginSession] = useState({display:"display-none"})
    const [updateSession, setupdateSession] = useState({});
    const [sessionDisplay, setSessionDisplay] = useState({display:""});
        
    const setComplainHandler =(event)=>{ setComplain({id:"complain", value:event.target.value}) }
    const setEmergencyHandler =(event)=>{ setEmergency({id:"emergency", value:event.target.value}) }
    const checkSession = ()=>{
        if (sessionItem === null) {
            setLoginSession({display:"row"})
        }
    }
    const submitChatSessionHandler=(event)=>{
        event.preventDefault(); 
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})
    

        const complainBody = {"emergencyLevel":emergency.value, "complain":complain.value}
       
        const url = "/api/v1/chatSession/create";
        fetch(url, {
            method: "POST",
            body:JSON.stringify(complainBody),
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                setLoginSession({display:"row"});
            }else if (response.status === 201) {
                setAlert({alertDisplay:"row", spinnerDisplay:"display-none", formDisplay:"display-none"})
            }
        })
    }
    const fetchUserSession=()=>{ 
        const url = "/api/v1/chatSession/user/"+sessionItem._id;
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                setLoginSession({display:"row"});
            }else if (response.status === 403) {
                setSessionDisplay({display:"display-none"})
                setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:"card"})
            }else if (response.status === 200) {console.log(response.message)
                if (response.message.emergencyLevel == 1) {
                    response.message.emergencyLevel = "Not Critical";
                }else if (response.message.emergencyLevel == 2) {
                    response.message.emergencyLevel = "Managable";
                }else if (response.message.emergencyLevel == 3) {
                    response.message.emergencyLevel = "Critical";
                }
                setupdateSession(response.message)
                setAlert({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:"display-none"})
            }
        })
    }

   const checkChatSession =()=>{
        socket.emit("check session", sessionItem._id);
    }
    socket.on("check session", (checkSession)=>{
        //console.log(checkSession)
        if(!checkSession ) {
            fetchUserSession();
        }else{
            let id ="";
            if (sessionItem._id === checkSession.from) {
                id = checkSession.to;
                window.location = "/chat/current/session/"+id;
            }else if(sessionItem._id === checkSession.to) {
                id = checkSession.from;      
            window.location = "/chat/current/session/"+id;
            }
        }
        
    })
    useEffect(()=>{
        checkSession();
        checkChatSession();
    }, [])

    return(
    <div className="container">
        
        <div className="col-12 col-sm-12 col-md-12">
           
            <div className="">
                <div className="section">
                    <div className="row justify-content-center align-items-center">
                        
                <div className="container verification">
                            <div className="card  position-fixed fixed-top">
                                <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <div className="col-4">
                                            <Link to="/user/dashboard">
                                                <i className="fa fa-arrow-left fa-lg text-dark" aria-hidden="false"></i>
                                            </Link>
                                        </div>  
                                        <div className="col-4">
                                            <Link to="/chat/doctors">
                                                <i  id="newMessage" className="fa fa-plus-circle fa-2x chat-dashboard-active"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-4">
                                            <Link to="/chat/notifications">
                                            <i  id="bell" className="fa fa-bell fa-2x text-dark" aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    <div className={alert.alertDisplay}>
                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3 ">
                            <div className="">
                                <div className="card-body top-margin-lg">
                                    <h3>Success!</h3>
                                    <h1 className="text-center top-margin-md">😎</h1>
                                    <p className="top-margin-md">Thank you for creating a session, Your complains have been sent to our doctors, you will be contacted shortly via email and notification.👍</p>
                                   <div className="col-12 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4 top-margin-md"> 
                                        <Link to="/user/dashboard">
                                                <button className="btn btn-medik top-margin-md">Go to dashboard</button>
                                            </Link>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={sessionDisplay.display}>
                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3 ">
                            <div className="card">
                                <div className="card-body top-margin-lg">
                                    <p>A session have already been created by you.</p>
                                    <p className="medik-color"><b className="text-dark">Emergency Level: </b>{updateSession.emergencyLevel}</p>
                                    <p className="text-center top-margin-md">User Complain</p>
                                    <small className="top-margin-md">{updateSession.complain}</small>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-12 top-margin-md"> 
                                    <span>A doctor will get to your shortly via email and push notification Thanks.</span>
                                        <Link to="/user/dashboard">
                                                <button className="btn btn-medik top-margin-md">Go to dashboard</button>
                                            </Link>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={`${alert.formDisplay}`}>
                    <LoginSession display={loginSession.display} />
                                <div className="card-body top-margin-lg medik-color">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h2 className="text-dark">Create a session by filling this form.</h2>
                                        <p className="top-margin-sm">Please spare a minute to fill this</p>
                                    <form onSubmit={submitChatSessionHandler}>
                                    <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Emergency Status</label>
                                                    <select required id={emergency.id} onChange={(event)=>setEmergencyHandler(event, emergency.id)} className="form-control">
                                                        <option value="">Please select</option>
                                                        <option value="1">Not Critical</option>
                                                        <option  value="2">Managable</option>
                                                        <option value="3">Critical</option>       
                                                    </select>
                                                </div>
                                            </div> <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Patient Complain <span className="text-danger"></span></label>
                                                   <textarea required id={complain.id} onChange={(event)=>setComplainHandler(event, complain.id)} className="form-control" placeholder="Explain how you are feeling."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            
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
                    
                    <div className={alert.spinnerDisplay}>
                        <div className="col-10 offset-4 col-sm-8 offset-sm-5 col-md-8 offset-md-5">
                            <i className="fa fa-spinner fa-pulse fa-2x text-dark top-margin-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChatCreateSession;