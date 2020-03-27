import React from 'react';
import Register  from "../../Assets/svgs/register.svg"
import { Link } from 'react-router-dom';
import RegistrationGettingStarted from './RegistrationGettingStarted';


const UserRegistration = (props) => {
    return (
          
            
        <div className="container-fluid">
        <div className="row form">
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                <div className="">
                    <div className="card-body"> 
                    <Link to="/"><i className="fa fa-arrow-left text-dark"></i></Link>
                    <h5>Create An Account</h5>
                      <p className={props.errorDisplay}>{props.errorMessage}</p>
                                  
                            <p className={props.errorDisplay}>{props.errorMessage}</p>
                                <form onSubmit={props.submit}> 
                                        <div className="row">
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
                                                    <input type="number" name="phonenumber"   className="form-control"  aria-describedby="phoneNumber" placeholder="0900000000" id={props.phonenumberId} onChange={props.phonenumberChange} value={props.phonenumberValue}  required/>
                                                    <span id={props.phonenumberErrorId} className={props.phonenumberClass}>{props.phonenumberErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phoneNumber">Date of birth</label>
                                                    <input type="date" name="age" min="1" max="3" className="form-control"  aria-describedby="age" placeholder="Please enter your date of birth." id={props.ageId} onChange={props.ageChange} value={props.ageValue}  required/>
                                                    <span id={props.ageErrorId} className={props.ageClass}>{props.ageErrorValue}</span>
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
                                                <label htmlFor="referral">How did you hear about us?</label>
                                                <select className="form-control" name="referral" id={props.socialMediaId} onChange={props.socialMediaChange} required>
                                                    <option value="">Select</option>
                                                    <option value="1">Twitter</option>
                                                    <option value="2">Facebook</option>
                                                    <option value="3">Instagram</option>
                                                    <option value="4">Google</option>
                                                    <option value="5">Friends</option>
                                                    <option  value="6">WhatsApp</option>
                                                </select>
                                                <span id={props.socialmediaErrorId} className={props.socialmediaClass}>{props.socialmediaErrorValue}</span>
                                            </div>
                                           
                                        </div>  
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                            <input type="submit" className="form-control b-medik medik-color-secondary" name="register" value="Sign up"/>
                                            <p>I already have an account? <Link to="/login">Log in</Link></p>
                                            </div>
                                        </div>
                                    </div>  
                                </form>
                                </div>
                          </div>
                      </div>
                  </div>
              </div>
        )
}

export default UserRegistration;