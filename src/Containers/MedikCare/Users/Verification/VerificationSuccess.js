import React, { Component } from 'react';
import Verified  from "../../Assets/svgs/verified.svg";
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';

class VerificationSuccess extends Component {
    constructor(props) {
        super(props)
        this.state= {
            display: "display-block",
            verification: {
                display:"display-block",
                message:"",
                dashboardDisplay:"display-block",
            },
            email : {
                type:"email",
                value: "",
                id: "email"
            },
        }
    }
      setEmail=(event)=>{ 
          const email = {"value":event.target.value, id:"email", "type":"email"};
        this.setState({email:email});
    }

    resendEmailHandler = ( event ) => {
        event.preventDefault();
        this.setState({display:"display-block"})
       let userData = {};
       const url = "/api/v1/user/mail/resend";
    const email = this.state.email.value;
       userData = {"email":email};
        fetch(url, {
            method: "POST",
            body:JSON.stringify(userData),
            headers: {'Content-Type': "application/json"}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 201) {
               sessionStorage.setItem("user", JSON.stringify(response));
               window.location = "/user/verification?verification-sent-successfully";
            }else if(response.status === 403) {
                const passwordError = {};
               this.setState({display:"display-none"})
               passwordError.display = "display-block";
               passwordError.value =response.message;
              this.setState({loginError: passwordError});
            }else if(response.status === 400) {  
                const displayPopMessage ={};             
           displayPopMessage.card = "card bg-danger text-white";
           displayPopMessage.display = "row";
           displayPopMessage.message =response.message;
           this.setState({display:"display-none"})
           this.setState({popMessage:displayPopMessage});
            }
        })
        .catch(e => {
        if(e) {window.location = "/login?something-went-wrong-please-check-your-internet-connection-and-try-again."}
        });
    }
    
    verifyUserMailHandler = () => {
        let token = this.props.match.params.id;
        const url = "/api/v1/user/user-verify";
        if (!token) {
            console.log(token)
            window.location = "/page-not-found";
        }
        fetch(url, {
            method:"PATCH",
            headers:{"Content-Type":"application/json", "u-auth":token}
        })
        .then(res => res.json())
        .then(response =>{
            this.setState({display:"display-none"})
            if(response.status === 401) {
                const verification = {display:"display-block", message:response.message, dashboardDisplay:"display-none"}
                this.setState({verification:verification});
            }else if(response.status === 200) {
                sessionStorage.setItem("user", JSON.stringify(response));
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
                                                <input type="email" placeholder="Enter your mail" className="form-control" onChange={(event) => this.setEmail(event,this.state.email.id)} id={this.state.email.id} value={this.state.email.value} required />
                                                <input type="submit" value="Re-Send Mail" className="btn btn-sm btn-medik" />
                                            </form>
                                            <Link to="/user/dashboard" className={this.state.verification.dashboardDisplay}>
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