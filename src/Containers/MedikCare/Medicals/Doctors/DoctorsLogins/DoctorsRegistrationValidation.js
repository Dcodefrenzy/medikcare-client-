import React, { Component } from 'react';
import NavBar from '../../../MedikWeb/NavBar/NavBar';
import Footer from '../../../MedikWeb/Footer';
import DoctorsRegistration from './DoctorsRegistration';
import PopMessage from '../../../PopMessage/PopMessage';
import Loading from '../../../Loading/Loading';


class DoctorsRegistrationValidation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerForm: {
                email : {
                    type:"email",
                    value: "",
                    id: "email"
                },
                firstname: {
                    type : "text",
                    value:"",
                    id:"firstname",
                },
                
                lastname: {
                    type : "text",
                    value:"",
                    id:"lastname",
                },
                
                phonenumber: {
                    type : "Number",
                    value:"",
                    id:"phonenumber",
                },
                gender: {
                    id:"gender",
                    value:"",
                },
                password: {
                    id:"password",
                    value:"",
                },
                pass: {
                    id:"pass",
                    value:"",               
                },
                folioNumber: {
                    id:"folioNumber",
                    value:"",
                },
             },
                emailError: {
                     id: "emailError",
                     display: "display-none",
                     value: ""
                 },
                 
                 firstNameError: {
                     id:"firstNameError",
                     display: "display-none",
                      value: ""
                 },
                 lastNameError: {
                     id:"lastNameError",
                     display: "display-none",
                      value: ""
                 },
                 phonenumberError: {
                     id:"phonenumberError",
                     display: "display-none",
                      value: ""
                 },
                 ageError: {
                    id:"ageError",
                    display:"display-none",
                    value:"",
                 },
                 genderError: {
                    id:"genderError",
                    display:"display-none",
                    value:"",
                 },
                 passwordError: {
                    id:"passwordError",
                     display: "display-none",
                     value: "",
                 },
                 passError: {
                    id:"passError",
                     display: "display-none",
                     value: "",
                 },
                 folioNumberError: {
                     id:"folioNumberError",
                     display:"display-none",
                     value:"",
                 },
            personalInformationDisplay: {
                display: "row"
            },

             popMessage : {
                 display: "display-none",
                 card: "",
                 message:"",
                 welcome: "",
                 
             },
            signUp:{
                display:"display-none form-control b-medik medik-color-secondary",
            },
            display: "display-none",
        }
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updateRegisterForm = {
            ...this.state.registerForm
        }
        const updateFormElement = {
            ...updateRegisterForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateRegisterForm[inputIdentifier] = updateFormElement; 
        this.validateForm(event, updateRegisterForm);
        this.setState({registerForm: updateRegisterForm});
    }
    validateForm = (event, formData) => {
        let phonenumberError = {};
        let emailError = {};
        let firstNameError  = {};
        let lastNameError = {};
        let passwordError = {};
        let passError = {};
        
        //handle error for first name input followed by the other form inputs.
            if(formData.firstname.value !== "" && formData.firstname.value.length === 0) {
                firstNameError.display ="display-block";
                firstNameError.value = "Your should input a last name";
                this.setState({firstNameError: firstNameError});
            } else { this.setState({firstNameError: firstNameError}); }
                //last name
            if(formData.lastname.value !== "" && formData.lastname.value.length === 0) {
                lastNameError.display ="display-block";
                lastNameError.value = "Your should input a last name";
                this.setState({lastNameError: lastNameError});
            } else { this.setState({lastNameError: lastNameError}); }
            //email
            if(formData.email.value !== "" && formData.email.value.length < 3) {
                emailError.display ="display-block";
                emailError.value = "Your email should be more than 3 characters";
                this.setState({emailError: emailError});
            } else { this.setState({emailError: emailError}); }
            //phone number
            if(formData.phonenumber.value !== "" && formData.phonenumber.value.length !== 11) {      
                 phonenumberError.display = "display-block";
                 phonenumberError.value ="Your Phone Number must be 11 characters";
                this.setState({phonenumberError: phonenumberError});
            }else { this.setState({phonenumberError: phonenumberError}); }

            //password 
            if(formData.password.value !=="" && formData.password.value.length < 6) {
                passwordError.display = 'display-block';
                passwordError.value =  "Your password should be more than 6 characters."; 
                this.setState({passwordError:passwordError});
            }else {this.setState({passwordError:passwordError})}
            //re-enter password.
            if(formData.pass.value !=="" && formData.pass.value !== formData.password.value) {
                passError.display = "display-block";
                passError.value = "Your password does not match the previous one.";
                this.setState({passError:passError});
            }else {this.setState({passError:passError})}
     }
     paginationHandler = (event, value) => {
            event.preventDefault();
            if(value === "Next"){
                const personalInfo = {display:"display-none"}
                const medicalInfo = {display:"row"}
                const prev = {value:"Prev"}
                const signUp = {display:"display-show form-control b-medik medik-color-secondary"}
                this.setState({personalInformationDisplay:personalInfo});
                this.setState({medicalInformationDisplay:medicalInfo});
                this.setState({pagination:prev});
                this.setState({signUp:signUp})
            }else if(value === "Prev") {
                const next ={value:"Next"}
                const personalInfo = {display:"row"}
                const medicalInfo = {display:"display-none"}
                const signUp = {display:"display-none form-control b-medik medik-color-secondary"}
                this.setState({personalInformationDisplay:personalInfo});
                this.setState({medicalInformationDisplay:medicalInfo});
                this.setState({signUp:signUp})
                this.setState({pagination:next})
            }
     }
     registerLoginHandler = (event) => {
         event.preventDefault();
        this.setState({display:"display-block"})

         const doctorData = {};
         for (const doctorId in this.state.registerForm) { 
            doctorData[doctorId] =  this.state.registerForm[doctorId].value;     
         }
         console.log(doctorData);
         const url = "/api/v1/doctor/register";
         fetch(url, {
            method: "POST",
            body:JSON.stringify(doctorData),
            headers: {'Content-Type': "application/json"},
         })
         .then(res => res.json()) 
        .then(response => {
            let phonenumberError = {};
            let emailError = {};
            let firstNameError  = {};
            let lastNameError = {};
            let passwordError = {};
            console.log(response);
            if(response.status === 201) {
                console.log(response)
                sessionStorage.setItem("doctor", JSON.stringify(response));
               window.location = "/doctor/verification?doctor-registration-successful";
            }else if(response.status === 403) {
               this.setState({display:"display-none"})
               //Error Handling
               if(response.message.firstname) {
                firstNameError.display ="display-block";
                firstNameError.value = response.message.firstname.message;
                this.setState({firstNameError: firstNameError});
            }else { this.setState({firstNameError: firstNameError}); }
                //last name
            if(response.message.lastname) {
                lastNameError.display ="display-block";
                lastNameError.value = response.message.lastname.message;
                this.setState({lastNameError: lastNameError});
            } else { this.setState({lastNameError: lastNameError}); }
            //email
            if(response.message.email) {
                emailError.display ="display-block";
                emailError.value = response.message.email.message;
                this.setState({emailError: emailError});
            }else if(response.message.name === 'MongoError' && response.message.keyPattern.email){
                emailError.display ="display-block";
                emailError.value = "Mail Already Exist";
                this.setState({emailError: emailError});
            } else { this.setState({emailError: emailError}); }
            //phone number
            if(response.message.phoneNumber) {      
                 phonenumberError.display = "display-block";
                 phonenumberError.value =response.message.phoneNumber.message;
                this.setState({phonenumberError: phonenumberError});
            }else if(response.message.name === 'MongoError' && response.message.keyPattern.phonenumber){
                phonenumberError.display ="display-block";
                phonenumberError.value = "Phone number Already Exist";
                this.setState({phonenumberError: phonenumberError});
            }else { this.setState({phonenumberError: phonenumberError}); }
            if(response.message.password) {
                passwordError.display = "display-block";
                passwordError.value = response.message.password.message;
                this.setState({passwordError:passwordError})
            }else {this.setState({passwordError:passwordError})} 

            }
        })
         .catch(e => {
            if(e) {window.location = "/doctor/registration?something-went-wrong-please-check-your-internet-connection-and-try-again."}
         })
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
                <div className="container-fluid top-margin-lg">
                <Loading display={this.state.display}/>
                <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                <DoctorsRegistration 
                 personalInformationDisplay={this.state.personalInformationDisplay.display}
                 firstnameId={this.state.registerForm.firstname.id} 
                 firstnameValue={this.state.registerForm.firstname.value}
                 firstnameChange={(event) => this.inputChangedHandler(event, this.state.registerForm.firstname.id)}
                 firstnameErrorId={this.state.firstNameError.id}
                  firstnameClass={this.state.firstNameError.display}
                 firstnameErrorValue={this.state.firstNameError.value}
                  
                 lastnameID={this.state.registerForm.lastname.id} 
                 lastnameValue={this.state.registerForm.lastname.value}
                 lastnameChange={(event) => this.inputChangedHandler(event, this.state.registerForm.lastname.id)}
                 lastnameErrorId={this.state.lastNameError.id}
                 lastnameClass={this.state.lastNameError.display}
                 lastnameErrorValue={this.state.lastNameError.value}

                 emailId={this.state.registerForm.email.id} 
                 emailValue={this.state.registerForm.email.value}
                 emailChange={(event) => this.inputChangedHandler(event, this.state.registerForm.email.id)}
                 emailErrorId={this.state.emailError.id}
                 emailClass={this.state.emailError.display}
                 emailErrorValue={this.state.emailError.value}

                 phonenumberId={this.state.registerForm.phonenumber.id} 
                 phonenumberValue={this.state.registerForm.phonenumber.value}
                 phonenumberChange={(event) => this.inputChangedHandler(event, this.state.registerForm.phonenumber.id)}
                 phonenumberErrorId={this.state.phonenumberError.id}
                 phonenumberClass={this.state.phonenumberError.display}
                 phonenumberErrorValue={this.state.phonenumberError.value}



                 passwordId={this.state.registerForm.password.id} 
                 passwordValue={this.state.registerForm.password.value}
                 passwordChange={(event) => this.inputChangedHandler(event, this.state.registerForm.password.id)}
                 passwordErrorId={this.state.passwordError.id}
                 passwordClass={this.state.passwordError.display}
                 passwordErrorValue={this.state.passwordError.value}

                 passId={this.state.registerForm.pass.id} 
                 passValue={this.state.registerForm.pass.value}
                 passChange={(event) => this.inputChangedHandler(event, this.state.registerForm.pass.id)}
                 passErrorId={this.state.passError.id}
                 passClass={this.state.passError.display}
                 passErrorValue={this.state.passError.value}
                
                genderId={this.state.registerForm.gender.id}
                genderValue={this.state.registerForm.gender.value}
                genderChange={(event)=>this.inputChangedHandler(event, this.state.registerForm.gender.id)}
                

                                folioNumberId={this.state.registerForm.folioNumber.id}
                 folioNumberValue={this.state.registerForm.folioNumber.value}
                 folioNumberChange={(event) => this.inputChangedHandler(event, this.state.registerForm.folioNumber.id)}
                 folioNumberErrorId={this.state.folioNumberError.id}
                 folioNumberClass={this.state.folioNumberError.display}
                 folioNumberErrorValue={this.state.folioNumberError.value}

                 signUp={this.state.signUp.display}
                 submit={this.registerLoginHandler}
                
                />
                </div>
            </div>
        )
    }
}


export default DoctorsRegistrationValidation;