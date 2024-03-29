import React, { Component } from 'react';
import NavBar from '../../../MedikWeb/NavBar/NavBar';
import Footer from '../../../MedikWeb/Footer';
import DoctorsLogin from './DoctorsLogin';
import PopMessage from '../../../PopMessage/PopMessage';
import Loading from '../../../Loading/Loading';


class DoctorLoginValidation extends Component  {
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
       const doctorData = {};
       const url = "/api/v1/doctor/login";
        for (let formId in this.state.loginForm) {
            doctorData[formId] = this.state.loginForm[formId].value;
        }
        fetch(url, {
            method: "POST",
            body:JSON.stringify(doctorData),
            headers: {'Content-Type': "application/json"}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 200) {
               sessionStorage.setItem("doctor", JSON.stringify(response));
               window.location = "/doctor/dashboard?login successful";
            }else if(response.status === 403) {
                const passwordError = {};
               this.setState({display:"display-none"});
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
        if(e) {window.location = "/doctor/login?something-went-wrong-please-check-your-internet-connection-and-try-again."}
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
        return(
            <div>
                <section className="container-fluid b-medik">
                    <Loading display={this.state.display}/>
                    <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                    <DoctorsLogin 
                        errorMessage={this.state.loginError.value}
                        errorDisplay={this.state.loginError.display}

                        emailId={this.state.loginForm.email.id} 
                        emailValue={this.state.loginForm.email.value}
                        emailChange={(event) => this.inputChangedHandler(event, this.state.loginForm.email.id)}
                        emailErrorId={this.state.emailError.id}
                        emailClass={this.state.emailError.display}
                        emailErrorValue={this.state.emailError.value} 
                        
                        passwordId={this.state.loginForm.password.id} 
                        passwordValue={this.state.loginForm.password.value}
                        passwordChange={(event) => this.inputChangedHandler(event, this.state.loginForm.password.id)}
                        passwordErrorId={this.state.passwordError.id}
                        passwordClass={this.state.passwordError.display}
                        passwordErrorValue={this.state.passwordError.value}

                        submit={this.formLoginHandler}
                    />
                </section>
            </div>
        )
    }
}

export default DoctorLoginValidation;