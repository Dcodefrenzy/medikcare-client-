import React, { Component } from 'react';
import NavBar from '../../NavBar/NavBar';
import Register  from "../../Assets/svgs/register.svg"
import { Link } from 'react-router-dom';
import Footer from '../../MedikWeb/Footer';
class UserRegistration  extends Component {
    constructor(props) {
        super(props);
        this.currentTab = 0;
        this.state = {
            currentTab : 0,
            tabName : 'tabShow',
        }
    }
    render() {
        return (
            <div>
                <NavBar />
              <section>
                  <div className="container-fluid">
                      <div className="row form">
                          <div className="col-12 col-sm-6 col-md-6">
                              <div>
                                  <img src={Register} className="home-svg" alt="register"/>
                              </div>
                          </div>
                          <div className="col-12 col-sm-6 col-md-6">
                              <div className="card">
                                  <div className="card-header b-medik medik-color-secondary home-content"><h1>User Registration</h1></div>
                                  <form>
                                    <div className={this.state.tabName}>      
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="firstName">First Name</label>
                                                <input type="text" className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder="Please enter your firstname" required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="lastName">Last Name</label>
                                                <input type="text" className="form-control" aria-describedby="firstname" min="3" name="lastname" placeholder="Please enter your lastname" required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="mail">Email address</label>
                                                <input type="email" name="mail" className="form-control"  aria-describedby="email" placeholder="example@mail.com" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={this.state.tabName}>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="phoneNumber">Phone Number</label>
                                                <input type="number" name="phonenumber" min="11" max="13" className="form-control"  aria-describedby="phoneNumber" placeholder="+23400000000" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="phoneNumber">Age</label>
                                                <input type="number" name="age" min="1" max="3" className="form-control"  aria-describedby="age" placeholder="Please enter you age" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" value="female" />
                                                <label className="form-check-label" for="femaleGender">Female</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" value="male" />
                                                <label className="form-check-label" for="maleGender">Male</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" value="others" />
                                                <label className="form-check-label" for="otherGender">Others</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={this.state.tabName}>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="password">Password</label>
                                                <input type="password" name="password" min="6" className="form-control"  aria-describedby="password" placeholder="Please enter your password" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label for="password">Re enter password</label>
                                                <input type="password" name="re-password" min="6" className="form-control"  aria-describedby="password" placeholder="Please re enter enter your password" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                          <div className="form-group">
                                              <label>Where did you hear about us?</label>
                                              <select className="form-control" name="referral">
                                                  <option className="1">Twitter</option>
                                                  <option className="2">Facebook</option>
                                                  <option className="3">Instagram</option>
                                                  <option className="4">Google</option>
                                                  <option className="5">Friends</option>
                                                  <option  className="6">WhatsApp</option>
                                              </select>
                                          </div>
                                      </div>    
                                    </div>  
                                      <div className="col-6 col-sm-6 col-md-6">
                                          <div className="form-group">
                                          <input type="submit" className="form-control b-medik medik-color-secondary" name="register" value="Sign up"/>
                                          </div>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-12 card-footer">
                                          <span>If you have sign up with us you can click this button to login</span> <Link to="/login"><button className="btn-sm medik-color-secondary b-medik">Login</button></Link>
                                      </div>  
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
              <Footer />
            </div>
            )
          
    }
}

export default UserRegistration;