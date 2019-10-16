import React from 'react';
import Register  from "../../Assets/svgs/register.svg"
import { Link } from 'react-router-dom';


const UserRegistration = (props) => {
    return (
          
              <div className="container-fluid">
                  <div className="row form">
                      <div className="col-12 col-sm-12 col-md-6">
                          <div>
                              <img src={Register} className="home-svg" alt="register"/>
                          </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6">
                          <div className="card">
                              <div className="card-header b-medik medik-color-secondary home-content"><h1>User Registration</h1></div>
                              <div className="card-body">
                                <form onSubmit={props.submit}> 
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input type="text" className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder="Please enter your firstname" id={props.firstnameId} onChange={props.firstnameChange} value={props.firstnameValue} required />
                                                    <span id={props.firstnameErrorId} className={props.firstnameClass}>{props.firstnameErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input type="text" className="form-control" aria-describedby="firstname" min="3" name="lastname" placeholder="Please enter your lastname" id={props.lastnameId} onChange={props.lastnameChange} value={props.lastnameValue} required />
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
                                                    <input type="number" name="phonenumber"   className="form-control"  aria-describedby="phoneNumber" placeholder="+23400000000" id={props.phonenumberId} onChange={props.phonenumberChange} value={props.phonenumberValue}  required/>
                                                    <span id={props.phonenumberErrorId} className={props.phonenumberClass}>{props.phonenumberErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phoneNumber">Age</label>
                                                    <input type="date" name="age" min="1" max="3" className="form-control"  aria-describedby="age" placeholder="Please enter your age" id={props.ageId} onChange={props.ageChange} value={props.ageValue}  required/>
                                                    <span id={props.ageErrorId} className={props.ageClass}>{props.ageErrorValue}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <label htmlFor="gender">Gender</label>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={props.gender} onChange={props.genderChange} value="female"  />
                                                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={props.gender} onChange={props.genderChange} value="male" />
                                                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name={props.gender} onChange={props.genderChange}  value="others" />
                                                    <label className="form-check-label" htmlFor="otherGender">Others</label>
                                                </div>
                                                <span id={props.genderErrorId} className={props.genderClass}>{props.genderErrorValue}</span>
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
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                            <input type="submit" className="form-control b-medik medik-color-secondary" name="register" value="Sign up"/>
                                            </div>
                                        </div>
                                    </div>  
                                </form>
                              </div>
                                <div className="col-12 col-sm-12 col-md-12 card-footer">
                                    <span>If you have sign up with us you can click this button to login</span> <Link to="/login"><button className="btn-sm medik-color-secondary b-medik">Login</button></Link>
                                </div>
                          </div>
                      </div>
                  </div>
              </div>
        )
}

export default UserRegistration;