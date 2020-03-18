import React from 'react';
import { Link } from 'react-router-dom';



const DoctorsRegistration = (props)=> {
    return(
        <div className="container-fluid">
                  <div className="row form">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
                          <div className="">
                              <div className="medik-color home-content">
                                  <h1>Doctors Registration</h1>
                                  <small>For doctors only.</small>
                                  <p className="text-dark">Join our pool of doctors that help saves life everyday. Your details will be verified by our management.</p>
                              </div>
                              <div className="">
                              
                                <form onSubmit={props.submit} encType="multipart/form-data"> 
                                        <div className={props.personalInformationDisplay}>
                                        <div className="col-12 col-sm-12 col-md-12"><h3 className="medik-color">Personal Information</h3></div>
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
                                    </div>
                                         <div className={props.medicalInformationDisplay}>  
                                         <div className="col-12 col-sm-12 col-md-12"><h3 className="medik-color">Medical Information</h3></div> 
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="address">Address</label>
                                                    <input type="text" name="address" className="form-control" id={props.addressId} onChange={props.addressChange} placeholder="E.g No 8, John doe street, opposite Maintown." required></input>
                                                    <span id={props.addressErrorId} className={props.addressClass}>{props.addressErrorValue}</span> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="medicalSchool">Medical School</label>
                                                    <input type="text" name="medicalSchool" className="form-control" id={props.medicalSchoolId} onChange={props.medicalSchoolChange} placeholder="Please enter the institution you finished from" required></input>
                                                    <span id={props.medicalSchoolErrorId} className={props.medicalSchoolClass}>{props.medicalSchoolErrorValue}</span> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="degree">Degree</label>
                                                    <input type="text" name="degree" className="form-control" id={props.degreeId} onChange={props.degreeChange} placeholder="Degree of study." required></input>
                                                    <span id={props.degreeErrorId} className={props.degreeClass}>{props.degreeErrorValue}</span> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="year">Date of Graduation</label>
                                                    <input type="date" name="year" className="form-control" id={props.yearId} onChange={props.yearChange} placeholder="Date of graduation" required></input>
                                                    <span id={props.yearErrorId} className={props.yearClass}>{props.yearErrorValue}</span> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="specialty">Specialty</label>
                                                    <input type="text" name="specialty" className="form-control" id={props.specialtyId} onChange={props.specialtyChange} placeholder="Area of specialty" required></input>
                                                    <span id={props.specialtyErrorId} className={props.specialtyClass}>{props.specialtyErrorValue}</span> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="folioNumber">Folio Number</label>
                                                    <input type="text" name="folioNumber" className="form-control" id={props.folioNumberId} onChange={props.folioNumberChange} placeholder="Please enter your Folio Number" required></input>
                                                    <span id={props.folioNumberErrorId} className={props.folioNumberClass}>{props.folioNumberErrorValue}</span> 
                                                </div>
                                            </div>
                                        </div>
                                       
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <button onClick={props.paginationClicked} className="btn btn-lg btn-medik">{props.pagination}</button>
                                            </div>
                                        </div>  
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input type="submit" className={props.signUp} name="register" value="Submit"/>
                                            </div>
                                        </div>
                                    </div>  
                                </form>
                              </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <span>If you have an account with us already you can click this button to login</span> <Link to="/doctor/login"><button className="btn-sm medik-color-secondary b-medik">Login</button></Link>
                                    <p><Link to="/index"><button className="btn-sm medik-color-secondary b-medik">Back Home</button></Link></p>
                           
                                </div>
                          </div>
                      </div>
                  </div>
              </div>
    )
}

export default DoctorsRegistration;