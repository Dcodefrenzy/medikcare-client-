import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading';
import NavbarFooter from '../NavBar/NavbarFooter';
import NavbarHeader from '../NavBar/NavBar';
import Lock  from '../../Assets/svgs/lock.svg';
import Profile  from '../../Assets/svgs/profile.svg';
import Record  from '../../Assets/svgs/record.svg';
import Payment  from '../../Assets/svgs/payment.svg';

const UserSettings= ()=>{
    
	const [display, setDisplay]  = useState({display:"block"});
    const   authentication = () => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    if(sessionItem === null) {window.location = "/login?Hi-Visitor-you-have-to-login-before-you-can-access-a-page-on-the-platform"}
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
                <Link to="/user/dashboard">  
                <i className="fa fa-arrow-left text-dark">Back</i>
                </Link>
                    <div className="user-section">
                        <div className="">
                                    <div className="row mt-3">
                                        <div className="col-3 col-sm-2 col-md-2">
    							            <img src={ Profile } alt="health-questions" className='home-svg'/>
                                        </div>
                                       <div className="col-7 col-sm-8 col-md-8">
                                            <Link to="/user/profile">   
    							            <h6>Personal Information</h6>
								            <p className="text-dark top-margin-sm">update your profile details here.</p>
                                            </Link>
                                       </div>
                                    </div>
                                    <div className="row mt-3">
                                        
                                         <div className="col-3 col-sm-2 col-md-2">
    							            <img src={ Lock } alt="health-questions" className='home-svg'/>
                                        </div>
                                       <div className="col-7 col-sm-8 col-md-8">
                                            <Link to="/user/password/change">
    							            <h6>Password Change</h6>
								            <p className="text-dark top-margin-sm">update your password to a new one.</p>
                                            </Link>
                                       </div>
                                    </div>
                                
                                <Link to="/user/reports">
                                    <div className="row mt-3">
                                         <div className="col-3 col-sm-2 col-md-2">
    							            <img src={ Record } alt="health-questions" className='home-svg'/>
                                        </div>
                                       <div className="col-7 col-sm-8 col-md-8">
                                            
    							            <h6>Medical Record</h6>
								            <p className="text-dark top-margin-sm">Download your medcal records here.</p>

                                       </div>
                                    </div>
                               
                                </Link>
                                    <div className="row mt-3">
                                         <div className="col-3 col-sm-2 col-md-2">
    							            <img src={ Payment } alt="health-questions" className='home-svg'/>
                                        </div>
                                       <div className="col-7 col-sm-8 col-md-8">
                                            
    							            <h6>Payment</h6>
								            <p className="text-dark top-margin-sm">update your password to a new one.</p>
                                            <span>Coming Soon!</span>
                                           
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
export default UserSettings;