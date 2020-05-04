import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';;

const ChatOngoingSessionRead = (props) => {
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    

    return (
        <div className={" " + props.display}>     
            <div className="fixed top-padding-lg b-medik">
                <main className="col-12 col-sm-12 col-md-12">
                        <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                            <button className="btn-sm btn-white medik-color" onClick={props.clicked}>Go back</button>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header b-medik text-white"> Session Details</div>
                                    <div className="card-body">
                                       <div className="row">
                                       <div className="col-12 col-sm-6 col-md-6">
                                           <p><b>Patient:</b> {props.username}</p>
                                           <p><b>Doctor:</b> {props.doctorname}</p>
                                            <p><b>Date Started: </b><Moment fromNow>{props.sessionDate}</Moment></p>
                                           <p><b>Complains:</b> {props.complains}</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </main>
            </div>
        </div>
    )
}

export default ChatOngoingSessionRead;