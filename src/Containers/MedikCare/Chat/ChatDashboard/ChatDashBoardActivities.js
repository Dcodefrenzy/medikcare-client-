import React, { useState } from 'react';

const ChatDashbordActivities = (props) =>{
    return(
        <div className={props.display}>
            <h1 className="text-dark text-center">Activities</h1>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-envelope fa-2x text-success float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark">You</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">You started a chat with  Kolade Jolade.</h6>
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-bell fa-2x text-warning float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark">Kolade Jolade</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Has finished his medication.</h6>
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-tasks fa-2x text-info float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark">You</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Submited Health report for Kolade.</h6>
                </div>
            </div>
                <div className="card b-medik top-margin-sm">
                    <div className="card-body text-white">
                    <h1 className="text-center">More..</h1>
                    </div>
                </div>
        </div>
    )
}

export default ChatDashbordActivities;