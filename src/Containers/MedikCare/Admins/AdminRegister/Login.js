import React, { Component } from 'react';
import LoginSvg  from "../../Assets/svgs/login.svg";
import Loading from "../../Loading/Loading"
import PopMessage from '../../PopMessage/PopMessage';

class Login extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            loginForm: {
               email : {
                   type:"email",
                   value: "",
                   id: "email"
               },
               password: {
                   type : "password",
                   value:"",
                   id:"password",
               },
            },
            emailError: {
                id: "emailError",
                display: "display-none",
                value: ""
            },
            
            passwordError: {
                id:"passwordError",
                display: "display-none",
                 value: ""
            },
            display: "display-none",
            loginError: {
                display: "display-none",
                value: "",
            },
            popMessage : {
                display: "display-none",
                card: "",
                message:"",
                welcome: "",
                
            },
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updateFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updatedLoginForm[inputIdentifier] = updateFormElement; 
        this.validateForm(event, updatedLoginForm);
        this.setState({loginForm: updatedLoginForm});
    }
        
    validateForm = (event, formData) => {
        let passwordError = {};
        let emailError = {};
            if(formData.email.value !== "" && formData.email.value.length < 3) {
                emailError.display ="display-block";
                emailError.value = "Your email should be more than 3 characters";
                this.setState({emailError: emailError});
            }
            else { this.setState({emailError: emailError}); }
            if(formData.password.value !== "" && formData.password.value.length < 6) {      
                 passwordError.display = "display-block";
                 passwordError.value ="Your password must be more than 6 characters";
                this.setState({passwordError: passwordError});
            }else { this.setState({passwordError: passwordError}); }

     }
     formLoginHandler = ( event ) => {
         event.preventDefault();
         this.setState({display:"display-block"})
        const adminData = {};
        const url = "http://192.168.33.12:3000/api/v1/admins/login";
         for (let formId in this.state.loginForm) {
             adminData[formId] = this.state.loginForm[formId].value;
         }
         fetch(url, {
             method: "POST",
             body:JSON.stringify(adminData),
             headers: {'Content-Type': "application/json"}
         })
         .then(res => res.json())
         .then(response => {
             if(response.status === 200) {
                 
                sessionStorage.setItem("admin", JSON.stringify(response));
                window.location = "/admin/dashboard?login successful";
             }else if(response.status === 403) {
                 const passwordError = {};
                this.setState({display:"display-none"})
                passwordError.display = "display-block";
                passwordError.value =response.message;
               this.setState({loginError: passwordError});
             }
         })
         .catch(e => {
             if(e) {window.location = "/admin/login?something-went-wrong-please-check-your-internet-connection-and-try-again."}
         });
     }
     onLoadHandler = (event) => {
        if(window.location.href.includes('?')) {
            const result = window.location.href.split('?');
           const  error = result[result.length-1]; 
            const displayPopMessage = {
            ...this.state.popMessage
            }
            displayPopMessage.card = "card bg-danger text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = decodeURI(error.replace(/-/g, ' '));
            this.setState({popMessage:displayPopMessage});
        }
    }
    
    componentDidMount() {
        this.onLoadHandler();
       }


    render() {
        return (
           <div className="container">
            <Loading display={this.state.display}/>
            <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
           <div className="col-12  col-sm-12 col-md-12  col-lg-12  align-center top-padding-sm">
                <h1>Admin Login Page</h1>
           </div>
                <section className="row">
                <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                    <img src={LoginSvg} className="home-svg" alt=""/>
                </div>
                <div className="col-12 col-sm-12 col-md-6  col-lg-6">
                    <div className="card">
                        <div className="card-header b-medik medik-color-secondary home-content"><h1>Admin Login</h1></div>
                            <div className="card-body">
                            <p className={this.state.loginError.display}>{this.state.loginError.value}</p>
                                <form onSubmit={this.formLoginHandler}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Mail</label>
                                                <input id={this.state.loginForm.email.id} onChange={(event) => this.inputChangedHandler(event, this.state.loginForm.email.id)} type={this.state.loginForm.email.type} className="form-control" min="3" aria-describedby="email" name="email" placeholder="Mail" value={this.state.loginForm.email.value} required />
                                                <span id={this.state.emailError.id} className={this.state.emailError.display}>{this.state.emailError.value}</span>
                                            </div>
                                         </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input id={this.state.loginForm.password.id} onChange={(event) => this.inputChangedHandler(event, this.state.loginForm.password.id)} type={this.state.loginForm.password.type} className="form-control" min="3" aria-describedby="password" name="password" value={this.state.loginForm.password.value} placeholder="Password" required />
                                                <span id={this.state.passwordError.id} className={this.state.passwordError.display}>{this.state.passwordError.value}</span>
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input className="btn-medik form-control" type="submit" name="register" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </section>
    
           </div>
        );
    }
}


export default Login