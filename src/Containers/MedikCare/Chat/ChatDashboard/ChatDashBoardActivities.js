import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatDashbordActivities = (props) =>{
    return(
        <div className="container-fluid b-medik">
        <div className="container">
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="card b-medik">
                        <div className="card-body">
                            <div className="card b-medik position-fixed fixed-top">
                                <div className="card-body text-white">
                                    <div className="row justify-content-between">
                                        <div className="col-3">
                                            <i className="fa fa-arrow-left fa-lg" aria-hidden="false"> Back</i>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/dashboard">
                                                <i  id="bell" className="fa fa-bell fa-3x text-white" aria-hidden="true"></i>
                                            </Link>
                                        </div>   
                                        <div className="col-3">
                                            <Link to="/chat/doctors">
                                                <i  id="newMessage" className="fa fa-plus-circle fa-3x chat-dashboard-active"> </i>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/chat/notifications">
                                                <i  id="activities" className="fa fa-tasks fa-3x text-white"  aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat">
                                    <section> 
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
                                        </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDashbordActivities;