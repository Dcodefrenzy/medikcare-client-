import React, { Component } from 'react';
import Verified  from "../../Assets/svgs/verified.svg"
import { Link } from 'react-router-dom';
class Verification extends Component {
 
   // sendMailVerification = () => {}
    //componentDidMount() {this.sendMailVerification();}

    render() {
        return (
            <section>
                <div className="container verification">
                    <div className="row">
                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="medik-color">Verification</h3>
                                    <p>A link has been sent to your mail please verify and get started</p>
                                    <img src={Verified} alt="verification for user" className="home-svg" />
                                   <div className="col-10 offset-3 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4"> 
                                        <Link to="/user/dashboard">
                                                <button className="btn btn-medik">Go to dashboard</button>
                                            </Link>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Verification;