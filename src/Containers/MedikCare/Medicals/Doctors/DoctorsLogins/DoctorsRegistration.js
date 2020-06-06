import React from 'react';
import { Link } from 'react-router-dom';



const DoctorsRegistration = (props)=> {
    return(
        <div className="container-fluid">
                  <div className="row form">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
                          <div className="">
                              <div className="medik-color home-content">
                                  <h1>Doctor's Registration</h1>
                                  <small>For doctors only.</small>
                                  <p className="text-dark">Join our pool of doctors that help saves life everyday. Your details will be verified by our management.</p>
                              </div>
                              <div className="">
                              
                                <form onSubmit={props.submit} encType="multipart/form-data"> 
                                        <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12"><h3 className="medik-color">Personal Information</h3></div>
                                            <div className="col-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input type="text" className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder="John" id={props.firstnameId} onChange={props.firstnameChange} value={props.firstnameValue} required />
                                                    <span id={props.firstnameErrorId} className={props.firstnameClass}>{props.firstnameErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input type="text" className="form-control" aria-describedby="firstname" min="3" name="lastname" placeholder="Doe" id={props.lastnameId} onChange={props.lastnameChange} value={props.lastnameValue} required />
                                                    <span id={props.lastnameErrorId} className={props.lastnameClass}>{props.lastnameErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="mail">Email address</label>
                                                    <input type="email" name="mail" className="form-control"  aria-describedby="email" placeholder="example@mail.com" id={props.emailId} onChange={props.emailChange} value={props.emailValue}  required/>
                                                    <span id={props.emailErrorId} className={props.emailClass}>{props.emailErrorValue}</span>
                                                </div>
                                            </div>
                                        
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phoneNumber">Phone Number</label>
                                                    <input type="number" name="phonenumber"   className="form-control"  aria-describedby="phoneNumber" placeholder="09000000000" id={props.phonenumberId} onChange={props.phonenumberChange} value={props.phonenumberValue}  required/>
                                                    <span id={props.phonenumberErrorId} className={props.phonenumberClass}>{props.phonenumberErrorValue}</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="folioNumber">Folio Number</label>
                                                    <input type="text" name="folioNumber" className="form-control" id={props.folioNumberId} onChange={props.folioNumberChange} placeholder="Please enter your Folio Number" required></input>
                                                    <span id={props.folioNumberErrorId} className={props.folioNumberClass}>{props.folioNumberErrorValue}</span> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="referral">Gender</label>
                                                    <select className="form-control" name="referral" id={props.gender} onChange={props.genderChange}  required>
                                                        <option value="">Select</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Others">Others</option>
                                                    </select>
                                                    <span id={props.genderErrorId} className={props.genderClass}>{props.genderErrorValue}</span>
                                                </div>
                                            </div> 
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" name="password" min="6" className="form-control"  aria-describedby="password" placeholder="Please enter your password"  id={props.passwordId} onChange={props.passwordChange} value={props.passwordValue} required/>
                                                    <span id={props.passwordErrorId} className={props.passwordClass}>{props.passwordErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="password">Re enter password</label>
                                                    <input type="password" name="re-password" min="6" className="form-control"  aria-describedby="password" placeholder="Please re enter enter your password" id={props.passId} onChange={props.passChange} value={props.passValue}  required/>
                                                    <span id={props.passErrorId} className={props.passClass}>{props.passErrorValue}</span>
                                                </div>
                                            </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <input type="submit" className="btn-medik btn btn-sm" name="register" value="Submit"/>
                                            </div>
                                        </div>
                                    </div>       
                                </form>
                              </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <p>I already have an account? <Link to="/doctor/login">Log in</Link></p>
                                </div>
                          </div>
                      </div>
                  </div>
              </div>
    )
}

export default DoctorsRegistration;