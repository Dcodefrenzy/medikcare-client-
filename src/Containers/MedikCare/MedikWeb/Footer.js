import React from 'react';
import { Link } from 'react-router-dom';


const Footer = (props) => {
    return (
        <section className="b-medik-color-secondary">
            <div className="container">
            <div className="text-center">
            <img  width="50%" src={"/MedikImage/MED1.png"} alt="logo"/>
             </div>
                <div className="row footer">
                    <div className="col-6 col-sm-6 col-md-3"> 
                        <div>
                            <ul>
                                MedikCare 
                                <li>Why medikCare</li>
                                <li>Services</li>
                                <li>Plans</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3 "> 
                        <div>
                            <ul>
                                Resources
                                <li>FAQ</li>
                                <li>Privacy</li>
                                <li>Terms</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3"> 
                        <div>
                            <ul>
                                Sections
                                <Link to="/login">
                                <li>Users</li>
                                </Link>
                                <Link to="/doctor/login">
                                <li>Doctors</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3"> 
                        <div>
                            <ul>
                                Contacts
                                <li>+2348133475878</li>
                                <li>medikcare mail</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Footer;
