import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import PopMessage from '../../PopMessage/PopMessage';

class AdminNewPassword extends Component {
    constructor(props) {
        super(props)
        this.state= {
            display: "display-none",
            response: {
                display:"display-none",
                message:"",
            },
            password : {
                type:"password",
                value: "",
                id: "password"
            },
            
            passwordError: {
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
      setPassword=(event)=>{ 
          const password = {"value":event.target.value, id:"password", "type":"password"};
        this.setState({password:password});
    }

    updatePasswordHandler = ( event ) => {
        event.preventDefault();
        this.setState({display:"display-block"})
       let userData = {};
       let token = this.props.match.params.id;
       const url = "/api/v1/admins/update/password";
    const password = this.state.password.value;
       userData = {"newPassword":password};
        fetch(url, {
            method: "POST",
            body:JSON.stringify(userData),
            headers: {'Content-Type': "application/json","x-auth":token}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 201) {
                const displayPopMessage ={};             
                displayPopMessage.card = "card bg-success text-white";
                displayPopMessage.display = "row";
                displayPopMessage.message =response.message;
                this.setState({display:"display-none"})
                this.setState({popMessage:displayPopMessage});
                sessionStorage.setItem("admin", JSON.stringify(response));
                window.location = "/admin/dashboard?login successful";
            }else if(response.status === 404) {
                const passwordError = {};
               this.setState({display:"display-none"})
               passwordError.display = "display-block";
               passwordError.value ="Email do not exist please register.";
              this.setState({emailError: passwordError});
            }else if(response.status === 403) {
                const passwordError = {};
               this.setState({display:"display-none"})
               passwordError.display = "display-block";
               passwordError.value ="Email do not exist please register.";
              this.setState({emailError: passwordError});
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
        if(e) {window.location = "/admin/forget-password?something-went-wrong-please-check-your-internet-connection-and-try-again."}
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
            <div className="user-section">
                
                <Loading display={this.state.display} />
                <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
            <div className="container">
                <div className="row form">
                    
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
                    
                <img  width="100%" src={"/MedikImage/MED2.png"} alt="logo"/>
                </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
                        <div className="card">
                            <div className="card-header medik-color  home-content">
                                <h1>Update Password</h1>
                                <span>Enter a new password.</span>
                            </div>
                            <span className={this.state.passwordError.display}>{this.state.passwordError.value}</span>
                            <form onSubmit={this.updatePasswordHandler}>
                                <div className="col-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" placeholder="Enter a new password here." className="form-control" onChange={(event) => this.setPassword(event,this.state.password.id)} id={this.state.password.id} value={this.state.password.value} required />
                                        </div>
                                    </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                    <input type="submit" className="form-control b-medik medik-color-secondary" name="Send" value="Submit"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 card-footer">
                                <span>Go back to</span> <Link to="/admin/login"><button className="btn-sm medik-color-secondary b-medik">Login</button></Link>
                                
                                </div>              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
            
        )
    }
}

export default AdminNewPassword;