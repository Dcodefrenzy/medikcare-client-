import React from 'react';
import { Link } from 'react-router-dom';

const DoctorLogin = (props) => {
  return (
    <div className="user-section">
        <div className="container">
            <div className="row form">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
                    <div className="card">
                        <div className="card-header medik-color  home-content"><h1>Doctor Login</h1></div>
                        
                        <p className={props.errorDisplay}>{props.errorMessage}</p>
                        <form onSubmit={props.submit}>
                            <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="mail">Email address</label>
                                        <input type="email" name="mail" className="form-control"  aria-describedby="email" placeholder="example@mail.com" id={props.emailId} onChange={props.emailChange} value={props.emailValue}  required/>
                                        <span id={props.emailErrorId} className={props.emailClass}>{props.emailErrorValue}</span>        
                                    </div>
                                </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" min="6" className="form-control"  aria-describedby="password" placeholder="Please enter your password"  id={props.passwordId} onChange={props.passwordChange} value={props.passwordValue} required/>
                                        <span id={props.passwordErrorId} className={props.passwordClass}>{props.passwordErrorValue}</span>           
                                    </div>
                                </div>
                            <div className="col-6 col-sm-6 col-md-6">
                                <div className="form-group">
                                <input type="submit" className="form-control b-medik medik-color-secondary" name="login" value="Login"/>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 card-footer">
                            <span>If you have not sign up with us you can click this link</span> <Link to="/doctor/registration"><button className="btn-sm medik-color-secondary b-medik">Register</button></Link>
                            </div>              
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorLogin;