import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import {socket} from '../../Socket/Socket';

const EndChatSessions = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [spinner, setSpinner] = useState({display:"", text:""});    
    const [message, setMessage] = useState({display:"display-none", color:"", message:""});
    


    const endSession = (event, id, start, end)=>{
        const url = "/api/v1/chatSession/admin-end";
    
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify({"id":id,"start":start,"end":end, "usermail":props.usermail, "doctormail":props.doctormail}),
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
            }else if (response.status === 403) {
               // console.log(response)
                const sessionData = {"from":props.userId, "to":props.doctorId};
                socket.emit("end session", sessionData);
            }else if (response.status === 201) {
                const sessionData = {"from":props.userId, "to":props.doctorId};
                socket.emit("end session", sessionData);
            }
        })
    }

    socket.on("end session", (dataset)=>{
        //console.log(dataset);
        setMessage({display:"", color:"", message:"Ended an ongoing session"+dataset._id});
        window.location.reload();
     })

    return (
        <div className={" " + props.display}>     
            <div className="admin-details-fixed top-padding-md">
                <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                        <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                            <button className="btn-sm btn-medik" onClick={props.clicked}>Go back</button>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header b-medik text-white"> Session Details</div>
                                    <div className="card-body">
                                       <div className="row">
                                       <div className="col-12 col-sm-6 col-md-6">
                                       <p className={message.display+ " "+message.color}>{message.message}</p>
                                           <p><b>Patient:</b> {props.username}</p>
                                           <p><b>Doctor:</b> {props.doctorname}</p>
                                            <p><b>Date Started: </b><Moment fromNow>{props.sessionDate}</Moment></p>
                                           <p><b>Complains:</b> {props.complains}</p>
                                           <button onClick={event=> endSession(event, props.sessionId, true, true, )} className="btn-sm btn-danger">End Session</button>
                                           <button onClick={event=> endSession(event, props.sessionId, false, false)} className="btn-sm btn-success">Revert Session</button>
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

export default EndChatSessions;