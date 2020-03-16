import React from 'react';
import Login  from "../../Assets/svgs/login.svg";
import { Link } from 'react-router-dom';

const UserLogin = (props) => {
  return (
        <div className="container">
            <div className="col-12 col-sm-12 col-md-12">
                <div className={`card opacity fixed b-medik`}>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed top-margin-md">
                    <main className="card ">
                            <div className="card-header  home-content"> 
                             <h1 className="medik-color">User Login</h1>
                            <span>Please enter your login details.</span> 
                            </div>
                        <div className="card-body">
                        <p className={props.errorDisplay}>{props.errorMessage}</p>
                            <form onSubmit={props.submit}>
                            <div className="row">
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
                                <span>If you have not sign up with us you can click this link</span> <Link to="/registration"><button className="btn-sm medik-color-secondary b-medik">Register</button></Link>
                                <p>Forget password? click <Link to="/user/forget/password">here</Link></p>
                                 <Link to="/index"><button className="btn-sm medik-color-secondary b-medik">Home</button></Link>
                                
                                </div>
                                </div>            
                            </form>
                        
                        </div>
                    </main>
                </div>
        </div>
  )
}

export default UserLogin;