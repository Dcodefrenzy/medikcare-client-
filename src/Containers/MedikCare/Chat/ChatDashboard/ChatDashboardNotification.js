import React, { useState, useEffect } from 'react';


const ChatDashboardNotification = (props) =>{
    return(
        <div className={props.display}>
            <h6 className="text-dark text-center">Chats</h6>
            <div className="card bottom-margin-sm">
                <div className="card-body text-dark">
                    <h6 className="card-text medik-color"><i className="fa fa-user"></i> Dr Mike</h6>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Hello I am Dr Mike and I will be doing your...</h6>
                </div>
            </div>
            <div className="card bottom-margin-sm">
                <div className="card-body text-dark">
                    <h6 className="card-text medik-color"><i className="fa fa-user"></i> Dr Mike</h6>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Hello I am Dr Mike and I will be doing your...</h6>
                </div>
            </div>
            <div className="card bottom-margin-sm">
                <div className="card-body text-dark">
                    <h6 className="card-text medik-color"><i className="fa fa-user"></i> Dr Mike</h6>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Hello I am Dr Mike and I will be doing your...</h6>
                </div>
            </div>
            <div className="card bottom-margin-sm">
                <div className="card-body text-dark">
                    <h6 className="card-text medik-color"><i className="fa fa-user"></i> Dr Mike</h6>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                    <h6 className="card-text">Hello I am Dr Mike and I will be doing your...</h6>
                </div>
            </div>
        </div>
    )
}

export default ChatDashboardNotification;