import React, { useState, useEffect } from 'react';


const ChatDashbordNewChat = (props) =>{
    return(
        <div className={props.display}>
            <h1 className="text-dark text-center">Doctors</h1>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-circle text-success float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr Mike Anthony</h3>
                    <p className="">Medicine and Surgery</p>
                    <span className="card-text">
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i> 
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                    </span> 
                    <i className="fa fa-envelope fa-2x float-right" aria-hidden="true" />                   
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-circle text-success float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr Vicky Daniels</h3>
                    <p className="">Medicine and Surgery</p>
                    <span className="card-text">
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i> 
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                    </span> 
                    <i className="fa fa-envelope fa-2x float-right" aria-hidden="true" />                   
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-circle text-warning float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr Ayo Sam</h3>
                    <p className="">Medicine and Surgery</p>
                    <span className="card-text">
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i> 
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                    </span> 
                    <i className="fa fa-envelope fa-2x float-right" aria-hidden="true" />                   
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-circle text-warning float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr Mark Zaky</h3>
                    <p className=""> Surgery</p>
                    <span className="card-text">
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i> 
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                    </span> 
                    <i className="fa fa-envelope fa-2x float-right" aria-hidden="true" />                   
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-circle text-success float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr Kike Susan</h3>
                    <p className="">Medicine and Surgery</p>
                    <span className="card-text">
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i> 
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                    </span> 
                    <i className="fa fa-envelope fa-2x float-right" aria-hidden="true" />                   
                </div>
            </div>
            <div className="card b-medik">
                <div className="card-body text-white">
                    <i className="fa fa-circle text-warning float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark"><i className="fa fa-user text-dark" aria-hidden="true"></i> Dr Kolade Kunle</h3>
                    <p className="">Family Medicine</p>
                    <span className="card-text">
                        <i className="fa fa-star fa-2x text-warning" aria-hidden="true"></i> 
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                    </span> 
                    <i className="fa fa-envelope fa-2x float-right" aria-hidden="true" />                   
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

export default ChatDashbordNewChat;