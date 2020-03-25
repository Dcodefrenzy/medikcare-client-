import React from 'react';
import { Link } from 'react-router-dom';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TwitterIcon,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    WhatsappIcon,
    FacebookShareCount,
  } from "react-share";

const RiskCaculator = (props) => {
  return (
        <div className={props.displayRisk}>
            <div className="col-12 col-sm-12 col-md-12">
                <div className={`card opacity fixed b-medik`}>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed">
                    <main className="card ">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 top-margin-sm">
                                    <h3>COVID-19 Risk Assessment Caculator Result</h3>
                                </div>
                                <div className="col-12 top-margin-sm">
                                   <i className={`fa fa-lightbulb-o fa-10x ${props.riskColor}`}></i>
                                </div>
                                <div className={`col-12 top-margin-md ${props.displayResultLow}`}>
                                    <h5>Low Risk</h5>
                                    <p>You COVID-19 risk is low.</p>
                                    <p>You are advised to stay at home and follow the advice on COVID-19.</p>
                                    <ol>
                                        <li>Maintain Social distancing</li>
                                        <li>Wash tour hands frequently</li>
                                    </ol>
                                    <p>You can make use of our medical app to speak to a medical doctor if needed and we are making it free for you.</p>
                                    <Link to="/registration" target="_blank"><button className="btn-sm medik-color-secondary b-medik">Register</button></Link>
                                </div>
                                <div className={`col-12 top-margin-md ${props.displayResultMedium}`}>
                                    <h5>Medium Risk</h5>
                                    <p>You COVID-19 risk is medium.</p>
                                    <p>You are advised to seek consultation with  a medical doctor.</p>
                                    <p>You can make use of our medical app to speak to a medical doctor and we are making it free for you.</p>
                                    <Link to="/registration" target="_blank"><button className="btn-sm medik-color-secondary b-medik">Register</button></Link>
                                </div>
                                <div className={`col-12 top-margin-md ${props.displayResultHigh}`}>
                                    <h5>High Risk</h5>
                                    <p>You COVID-19 risk is medium.</p>
                                    <p>You are advised to do the following.</p>
                                    <ol>
                                        <li>Isolate yourself from everyon around you.</li>
                                        <li>Call the following numbers</li>
                                    </ol>
                                    <p><b>Nigeria: </b>080097000010, 08023169485, 08033565529</p>
                                    <p>You can make use of our medical app to speak to a medical doctor and we are making it free for you.</p>
                                    <Link to="/registration" target="_blank"><button className="btn-sm medik-color-secondary b-medik">Register</button></Link>

                                </div>
                                <div className="col-12"> 
                                
                                </div>
                            </div>
                        </div>
                    </main>
            </div>
        </div>
  )
}

export default RiskCaculator;