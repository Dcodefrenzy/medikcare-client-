import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Loading from '../../../Loading/Loading';
import Lock  from '../../../Assets/svgs/lock.svg';
import Profile  from '../../../Assets/svgs/profile.svg';


const DoctorSettings= ()=>{
    
	const [display, setDisplay]  = useState({display:"block"});
const   authentication = () => {
    const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
    if(sessionItem === null) {window.location = "/doctor/login?Hi-Visitor-you-have-to-login-before-you-can-access-a-page-on-the-platform"}
    else { setDisplay({display:"display-none"});}
}
useEffect(()=>{
	authentication();
  }, [])
    return (
    <div className="container">

        <Loading display={display.display}/>
        <section className="user-section">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-md-2 offset-lg-2 ">
                <div className="card user-dashboard-content">
                <h1>Settings</h1>
                <Link to="/doctor/dashboard">  
                <i className="fa fa-arrow-left text-dark">Back</i>
                </Link>
                    <div className="user-section">
                        <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-2 col-sm-2 col-md-2">
    							            <img src={ Profile } alt="health-questions" className='home-svg'/>
                                        </div>
                                       <div className="col-8 col-sm-8 col-md-8">
                                            <Link to="/doctor/profile">   
    							            <h3>Personal Information</h3>
								            <p className="text-dark top-margin-sm">update your profile details here.</p>
                                            </Link>
                                       </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        
                                         <div className="col-2 col-sm-2 col-md-2">
    							            <img src={ Lock } alt="health-questions" className='home-svg'/>
                                        </div>
                                       <div className="col-8 col-sm-8 col-md-8">
                                            <Link to="/doctor/password/change">
    							            <h3>Password Change</h3>
								            <p className="text-dark top-margin-sm">update your password to a new one.</p>
                                            </Link>
                                       </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}
export default DoctorSettings;