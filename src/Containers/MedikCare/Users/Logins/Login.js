import React from 'react';
import Login  from "../../Assets/svgs/login.svg";
import { Link } from 'react-router-dom';

const UserLogin = (props) => {
  return (
    <section>
        <div className="container">
            <div className="row form">
                <div className="col-12 col-sm-6 col-md-6">
                    <div>
                        <img src={Login} className="home-svg"/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="card">
                        <div className="card-header b-medik medik-color-secondary home-content"><h1>User Login</h1></div>
                        <form>
                            <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <label for="mail">Email address</label>
                                        <input type="email" name="mail" className="form-control"  aria-describedby="email" placeholder="example@mail.com" />
                                    </div>
                                </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                    <div className="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" name="password" min="6" className="form-control"  aria-describedby="password" placeholder="Please enter your password" />
                                    </div>
                                </div>
                            <div className="col-6 col-sm-6 col-md-6">
                                <div className="form-group">
                                <input type="submit" className="form-control b-medik medik-color-secondary" name="login" value="Login"/>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 card-footer">
                            <span>If you have not sign up with us you can click this link</span> <Link to="/registration"><button className="btn-sm medik-color-secondary b-medik">Register</button></Link>
                            </div>              
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserLogin;