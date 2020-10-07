import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import NavBar from "../Navbar/NavBar";
import SideBar from "../Navbar/SideBar";
import {socket} from '../../Socket/Socket';
import AdminDashboard from "../AdminDashboard";
import Loading from "../../Loading/Loading";
import EndChatSessions from "./EndChatSessions";


const AdminChatSession = ()=>{
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [waitingSessions, setWaitingSession] = useState([]);
    const [ongoingSession, displayOngoingSession] = useState([]);
    const [sessionFullDisplay, setSessionFullDisplay] = useState({display:"display-none"});
    const [sessionFullDetails, setSessionFullDetails] = useState({usermail:"",doctormail:"",sessionDate:"",complains:"",userId:"", username:"", doctorId:"", doctorname:"", sessionId:""});
    const [message, setMessage] = useState({display:"display-none", color:"", message:""});
    const fetchUserWaitingList=()=>{ 
        const url = "/api/v1/chatSession/admin/";
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
                
            }else if (response.status === 403) {
            }else if (response.status === 200) {console.log({"wait":response})
                setWaitingSession(response.message)
            }
        })
    }
     const fetchOngoingSessions = ()=>{
         socket.emit("all sessions");
     }
    socket.on("all sessions", (sessions)=>{ 
        console.log(sessions);    
        displayOngoingSession(sessions);
    })

    const sessionWait = waitingSessions.map((session, index)=>{
        let color
        if (session.session.emergencyLevel == 1) {
            session.session.emergencyLevel = "Not Critical";
            color = "text-primary"
        }else if (session.session.emergencyLevel == 2) {
            session.session.session = "Managable";
            color = "text-warning";
        }else if (session.session.emergencyLevel == 3) {
            session.session.emergencyLevel = "Critical";
            color = "text-danger";
        }
      return  <tr  key={session.session._id}>
            <th scope="col">{index+1}</th>
            <td scope="col">{session.name}</td>
            <td scope="col"><Moment fromNow>{session.session.createdAt}</Moment></td>
        </tr>
    })
    const ongoinSession = ongoingSession.map((session,index)=>{
        return <tr key={session._id}>
                    <th scope="col">{index+1}</th>
                    <td scope="col">
                        <span><Moment fromNow>{session.start}</Moment></span>
                    </td>
                    <td className="col">                        
                        <i onClick={event => checkUserSession(event, session)} className="fa fa-eye text-success"></i>
                        
                    </td>
                </tr>
    })


const checkUserSession = (event, data)=>{
    const url = "/api/v1/chatSession/admin-check";
    
    fetch(url, {
        method: "PATCH",
        body:JSON.stringify(data),
        headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
    })
    .then(res => res.json())
    .then(response => { 
        if(response.status === 401) {
            sessionStorage.removeItem("admin");
            
        }else if (response.status === 403) {
            console.log(response)
            const sessionData = {"from":response.message.chatSession.from, "to":response.message.chatSession.to};
            socket.emit("end session", sessionData);
        }else if (response.status === 200) {console.log(response.message)
            setSessionFullDisplay({display:""})
            setSessionFullDetails({
                        userId:response.message.user._id, 
                        username:response.message.user.name, 
                        usermail:response.message.user.email,
                        doctorId:response.message.doctor._id, 
                        doctorname:response.message.doctor.name, 
                        doctormail:response.message.doctor.email,
                        sessionId:response.message.session._id,
                        complains:response.message.session.complain,
                        sessionDate:response.message.chatSession.start
                    });
        }
    })
}
const reverseDisplay = (event)=>{
    setSessionFullDisplay({display:"display-none"});
}

    
socket.on("end session", (dataset)=>{
    //console.log(dataset);
    setMessage({display:"", color:"", message:"Ended an ongoing session"+dataset._id});
    window.location.reload();
 })

    useEffect(()=>{
        fetchUserWaitingList();
        fetchOngoingSessions();
    }, [])


    return (
        <div>
            <EndChatSessions 
                    clicked={(event)=>reverseDisplay(event)}
                    display={sessionFullDisplay.display} 
                    userId={sessionFullDetails.userId}
                    username={sessionFullDetails.username} 
                    usermail={sessionFullDetails.usermail}
                    doctorId={sessionFullDetails.doctorId}
                    doctorname={sessionFullDetails.doctorname} 
                    doctormail={sessionFullDetails.doctormail}
                    complains={sessionFullDetails.complains}
                    sessionDate={sessionFullDetails.sessionDate}
                    sessionId={sessionFullDetails.sessionId}/>
            <NavBar />  
            <SideBar />
            <div className="top-margin-sm">
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                            <Link to="/admin/dashboard">
                                <button className="btn btn-sm btn-medik">Go Back</button>
                            </Link>
                            <div className="card">
                                <div className="card-body">
                                   <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6>Ongoing Chat Session</h6>
                                                    <p className={message.display+ " "+message.color}>{message.message}</p>
                                                    <table  className="table">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th scope="col">S/N</th>
                                                                <th scope="col">Details</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {ongoinSession}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card">
                                                <div className="card-body top-margin-md">
                                                    <h6>Waiting List</h6>
                                                    <table  className="table">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th scope="col">S/N</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {sessionWait}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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

export default AdminChatSession;