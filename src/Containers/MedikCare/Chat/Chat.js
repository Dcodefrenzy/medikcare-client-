import React, {useState, useEffect} from "react" ;
import socketIOClient from "socket.io-client";




const Chat =()=>{

    
    return(
        <div className="overflow-hidden">
            <div className="container-fluid bg-dark">
                <div className="row">
                    <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                        <div className="card bg-dark">
                            <div className="card-body">
                                <div className="card bg-dark chat-static chat-static-top">
                                    <div className="card-body text-white">
                                       <div className="row justify-content-center">
                                           <div className="col-10">
                                                <i className="fa fa-arrow-left fa-lg" aria-hidden="false"> Back</i>
                                           </div>
                                            <div className="col-2">
                                                <div className="dropdown">
                                                    <i className="fa fa-ellipsis-v  fa-3x" aria-hidden="true" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></i>
                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="#">End Chat</a>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Back</a>
                                                    </div>
                                                </div>  
                                            </div>
                                       </div>
                                    </div>
                                </div>
                               <div className="chat">
                                    <div className="max-width float-left">
                                        <div className="card b-medik">
                                            <div className="card-body text-white">
                                                <i className="card-text text-dark">Dr Anthony</i>
                                                <p className="card-text">Hello, I was wondering if we could chat concerning  my health.</p>
                                                <span className="card-text text-dark float-left"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-width float-right">
                                        <div className="card">
                                            <div className="card-body">
                                            <i className="card-text medik-color">You</i>
                                                <p className="card-text">Hello I am Dr Mike.</p>
                                                <span className="card-text float-right medik-color"><i className="fa fa-clock-o" aria-hidden="true"></i> 4 mins ago <i className="fa fa-check" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-width float-left">
                                        <div className="card b-medik">
                                            <div className="card-body text-white">
                                                <i className="card-text text-dark">Dr Anthony</i>
                                                <p className="card-text"> its so good to hear from you today.</p>
                                                <span className="card-text float-left text-dark"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-width float-right">
                                        <div className="card">
                                            <div className="card-body ">
                                                <p className="card-text">Hello Dr Mike! its so good to hear from you today. I was wondering if we could chat concerning  my health.</p>
                                                <span className="card-text float-right medik-color"><i className="fa fa-clock-o" aria-hidden="true"></i> 4 mins ago <i className="fa fa-check" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-width float-left">
                                        <div className="card b-medik">
                                            <div className="card-body text-white">
                                                <i className="card-text text-dark">Dr Anthony</i>
                                                <p className="card-text">Hello Dr Mike! its so good to hear from you today. I was wondering if we could chat concerning  my health.</p>
                                                <span className="card-text float-left text-dark"><i className="fa fa-clock-o" aria-hidden="true"></i> 10 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-width float-right">
                                        <div className="card">
                                            <div className="card-body ">
                                                <p className="card-text">Hello Dr Mike! .</p>
                                                <span className="card-text float-right medik-color"><i className="fa fa-clock-o" aria-hidden="true"></i> 4 mins ago <i className="fa fa-check" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                                <div className="clearfix"></div>
                                <div className="card bg-dark chat-static chat-static-buttom">
                                   <div className="card-body">
                                        <form>
                                            <div className="row">
                                               <div className="col-10">
                                                    <div className="form-group">
                                                        <textarea className="form-control chat-message" placeholder="Start a new message" rows="1"></textarea>
                                                    </div>
                                               </div>
                                               <div className="col-2">
                                                   <input type="submit" className="form-contol btn btn-lg btn-medik" value="Send" />
                                                   </div>
                                            </div>
                                        </form>
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

export default Chat;