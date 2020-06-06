import React from 'react';


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
                                <li><a href="">Why medikCare</a></li>
                                <li><a href="">Services</a></li>
                                <li><a href="">Prcing</a></li>
                                <li><a href="">Privacy</a></li>
                                <li><a href="">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3 "> 
                        <div>
                            <ul>
                                Resources
                                <li><a href="">FAQ</a></li>
                                <li><a href="">Privacy</a></li>
                                <li><a href="">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3"> 
                        <div>
                            <ul>
                                Sections
                                <li><a href="">Users</a></li>
                                <li><a href="">Companies</a></li>
                                <li><a href="">Doctors</a></li>
                                <li><a href="">Medical Personels</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3"> 
                        <div>
                            <ul>
                                Contacts
                                <li><a href="">+2348133475878</a></li>
                                <li><a href="mailto:medikcare1@gmail.com" target="_blank">medikcare</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Footer;
