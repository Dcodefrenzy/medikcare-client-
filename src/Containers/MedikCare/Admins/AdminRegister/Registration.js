import React, { Component } from 'react';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import Loading from '../../Loading/Loading';

class Registration extends Component  {

    constructor(props) {
        super(props);
        
     this.sessionItem = JSON.parse(sessionStorage.getItem("admin"));
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
                
                phoneNumber: {
                    type : "Number",
                    value:"",
                    id:"phoneNumber",
                },
                level : {
                    id:"level",
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
             display: "display-none",
             levelError: {
                id:"levelError",
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
    //handle authentication and called inside componentDidMount react lifecycle component.
    authentication = () => {
    
        if(this.sessionItem === null) {window.location = "/admin/login?Hi-Admin-you-have-to-login-before-you-can-access-a-page-on-the-admin-platform"}
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
        console.log(updateRegisterForm)
    }
    validateForm = (event, formData) => {
        let phonenumberError = {};
        let emailError = {};
        let firstNameError  = {};
        let lastNameError = {};
        
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
            if(formData.phoneNumber.value !== "" && formData.phoneNumber.value.length !== 11) {      
                 phonenumberError.display = "display-block";
                 phonenumberError.value ="Your Phone Number must be 11 characters";
                this.setState({phonenumberError: phonenumberError});
            }else { this.setState({phonenumberError: phonenumberError}); }

     }
     registerLoginHandler = ( event ) => {
        event.preventDefault();
        this.setState({display:"display-block"})
       const adminData = {};
       const url = "http://192.168.33.12:3000/api/v1/admins/register";
        for (let formId in this.state.registerForm) {
            adminData[formId] = this.state.registerForm[formId].value;
        }
        fetch(url, {
            method: "POST",
            body:JSON.stringify(adminData),
            headers: {'Content-Type': "application/json", "x-auth": this.sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            let phonenumberError = {};
            let emailError = {};
            let firstNameError  = {};
            let lastNameError = {};
            let levelError = {};
            if(response.status === 201) {
               window.location = "/admin/admins?Admin-registration-successful";
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
            }else { this.setState({phonenumberError: phonenumberError}); } 
            
            if(response.message.level) {      
                levelError.display = "display-block";
                levelError.value =response.message.level.message;
               this.setState({levelError: levelError});
           }else { this.setState({levelError: levelError}); } 

            }else  if(response.status === 401) {
                sessionStorage.removeItem("admin")
                window.location = "/admin/login?Your-session-has-ended-please-login."

            }
        })
        .catch(e => console.log(e));
    }
    componentDidMount() {
        this.authentication();
    }
    render() {
        return (
            <div>
                <Loading display={this.state.display}/>
                <NavBar />
                <div className="container-fluid">
                    <div className="col-12  col-sm-12 col-md-12  col-lg-12  align-center top-padding-sm">
                         <h1>Registration Page</h1>
                    </div>
                    <div className="row">
                        <SideBar />
                            <main className="col-12 col-sm-12 col-md-6  col-lg-6 form">
                                <div className="card">
                                    <div className="card-header b-medik medik-color-secondary home-content"><h1>Admin Registration</h1></div>
                                    <div className="card-body">
                                        <form onSubmit={this.registerLoginHandler}>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="firstName">First Name</label>
                                                        <input id={this.state.registerForm.firstname.id} onChange={(event) => this.inputChangedHandler(event, this.state.registerForm.firstname.id)} type={this.state.registerForm.firstname.type} className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder="firstname" value={this.state.registerForm.firstname.value} required />
                                                        <span id={this.state.firstNameError.id} className={this.state.firstNameError.display}>{this.state.firstNameError.value}</span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">Last Name</label>
                                                        <input id={this.state.registerForm.lastname.id} onChange={(event) => this.inputChangedHandler(event, this.state.registerForm.lastname.id)} type={this.state.registerForm.lastname.type} className="form-control" min="3" aria-describedby="lastname" name="lastname" placeholder="Lastname" value={this.state.registerForm.lastname.value} required />
                                                        <span id={this.state.lastNameError.id} className={this.state.lastNameError.display}>{this.state.lastNameError.value}</span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Mail</label>
                                                        <input id={this.state.registerForm.email.id} onChange={(event) => this.inputChangedHandler(event, this.state.registerForm.email.id)} type={this.state.registerForm.email.type} className="form-control" min="3" aria-describedby="email" name="email" placeholder="Mail" value={this.state.registerForm.email.value} required />
                                                        <span id={this.state.emailError.id} className={this.state.emailError.display}>{this.state.emailError.value}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="number">Phone Number</label>
                                                        <input id={this.state.registerForm.phoneNumber.id} onChange={(event) => this.inputChangedHandler(event, this.state.registerForm.phoneNumber.id)} type={this.state.registerForm.phoneNumber.type} className="form-control" min="3" aria-describedby="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={this.state.registerForm.phoneNumber.value} required />
                                                        <span id={this.state.phonenumberError.id} className={this.state.phonenumberError.display}>{this.state.phonenumberError.value}</span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6">
                                                    <div className="form-group">
                                                    <label htmlFor="lastName">Admin Role</label>
                                                        <select name="level" className="form-control" onChange={(event) => this.inputChangedHandler(event, this.state.registerForm.level.id)}>
                                                            <option></option>
                                                            <option value="2">Staff Admin</option>
                                                            <option value="1">Admin</option>
                                                        </select>
                                                        <span id={this.state.levelError.id} className={this.state.levelError.display}>{this.state.levelError.value}</span>
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
                            </main>
                            <div className="col-12 col-sm-6 col-md-4 form">
                                <div className="card">
                                    <div className="card-header"><h1>Note!</h1></div>
                                    <div className="card-body  note">
                                        <p>Hello Admin, Adding a new admin require getting few things, you need details like Last Name, Last Name, phone number, Email and Admin role.</p>
                                        <p>For admins with staff role, they wont get access to some things on their dashboard while those with admistrator will get access to everything on the app. </p> 
                                        <p> Note! the new account you are adding will make use of his or her phone  number as the password when he or she is want to login. </p>
                                    </div>
                                </div>
                            </div>
                     </div>
                 </div>
            </div>
        );
    }
}


export default Registration