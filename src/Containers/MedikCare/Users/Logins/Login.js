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
                <main className="card-body">  
                          <Link to="/"><span className="fa fa-arrow-left text-dark"></span></Link>
                         <h1 className="text-dark">User Login</h1>
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
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                    <input type="submit" className="form-control bg-dark medik-color-secondary" name="login" value="Login"/>
                                    <Link to="/user/forget/password"><p className="text-white">Forget password?</p></Link>
                                    <p>I don't  have an account? <Link to="/registration"  className="text-white">Register</Link></p>
                                    </div>
                                </div>
                               
                                </div>            
                            </form>
                    </main>
                </div>
        </div>
  )
}

export default UserLogin;