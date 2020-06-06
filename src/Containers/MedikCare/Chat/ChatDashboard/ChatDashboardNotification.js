import React, { useState, useEffect } from 'react';


const ChatDashboardNotification = (props) =>{
    return(
        <div className={props.display}>
            <h1 className="text-dark text-center">Chats</h1>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-envelope text-dark float-right"> 2</i>
                    <h3 className="card-text text-dark">Dr Mike</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Hello I am Dr Mike and I will be doing your...</h6>
                </div>
            </div>
            <div className="card  b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-envelope-open text-dark float-right"></i>
                    <h3 className="card-text text-dark">Dr Anthony</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 23 hours </span>
                    <h6 className="card-text">How are you feeling now?.</h6>
                </div>
            </div>
            <div className="card  b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-envelope-open text-dark float-right"></i>
                    <h3 className="card-text text-dark">Dr Ike</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 3 days ago</span>
                    <h6 className="card-text">Hello I am Dr Ike and I will be doing your...</h6>
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-envelope-open text-dark float-right"></i>
                    <h3 className="card-text text-dark">Dr Vicky</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> Oct 3</span>
                    <h6 className="card-text">Good to know, I have apprved your...</h6>
                </div>
            </div>
        </div>
    )
}

export default ChatDashboardNotification;