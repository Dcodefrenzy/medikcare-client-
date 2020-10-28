import React,  { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DoctorLoginSession from '../Medicals/Doctors/DoctorsLogins/LoginSession';
import LoginSession from '../Users/Logins/LoginSession';
import {socket} from '../Socket/Socket';



const ChatImageDisplay = (props)=>{




    return (
        <div className={props.display}>
            <div className="card  fixed opacity bg-dark pt-5">
                <main className="row mt-5">                                    
                    <div className="col-2 col-sm-2 col-md-2">
                        <span onClick={props.hideImage}  className="fa fa-arrow-left f text-white" aria-hidden="false"></span>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12">   
                        <img className="image-responsive" width="100%" src={props.image} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ChatImageDisplay;