import React, { Component } from 'react';
import Verified  from "../../Assets/svgs/verified.svg"
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';

class VerificationSuccess extends Component {
    constructor(props) {
        super(props)
        this.state= {
            display: "display-block",
            verification: {
                display:"display-none",
                message:"",
                dashboardDisplay:"display-block",
            },
        }
    }

    verifyUserMailHandler = () => {
        let token = this.props.match.params.id;
        const url = "/api/v1/admins/admin-verify";
        if (!token) {
            console.log(token)
            window.location = "/page-not-found";
        }
        fetch(url, {
            method:"PATCH",
            headers:{"Content-Type":"application/json", "x-auth":token}
        })
        .then(res => res.json())
        .then(response =>{
            this.setState({display:"display-none"})
            if(response.status === 401) {
                const verification = {display:"display-block", message:response.message, dashboardDisplay:"display-none"}
                this.setState({verification:verification});
            }else if(response.status === 200) {
                sessionStorage.setItem("admin", JSON.stringify(response));
                const verification = {display:"display-none", message:"Your account was verified successfully, medikCare is glady to have you.", dashboardDisplay:"display-block"}
               
                this.setState({verification:verification});
            }
           
        })
    }
    componentDidMount() {this.verifyUserMailHandler();}

    render() {
        return (
            <div>
                <Loading display={this.state.display} />
                <section>
                    <div className="container verification">
                        <div className="row">
                            <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="medik-color">Verification</h3>
                                        <p>{this.state.verification.message}</p>
                                        <img src={Verified} alt="verification for user" className="home-svg" />
                                        <div className="col-10 offset-4 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4">
                                            <form onSubmit={this.resendEmailHandler} className={this.state.verification.display}>
                                                <input type="email" placeholder="Enter your mail" required />
                                                <input type="submit" value="Re-Send Mail" className="btn btn-sm btn-medik" />
                                            </form>
                                            <Link to="/admin/dashboard" className={this.state.verification.dashboardDisplay}>
                                                <button className="btn btn-medik">Go to dashboard</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default VerificationSuccess;