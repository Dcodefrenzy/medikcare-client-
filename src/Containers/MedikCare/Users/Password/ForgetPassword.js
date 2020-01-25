import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import PopMessage from '../../PopMessage/PopMessage';

class UserForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state= {
            display: "display-none",
            response: {
                display:"display-none",
                message:"",
            },
            email : {
                type:"email",
                value: "",
                id: "email"
            },
            
            emailError: {
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
      setEmail=(event)=>{ 
          const email = {"value":event.target.value, id:"email", "type":"email"};
        this.setState({email:email});
    }

    sendEmailHandler = ( event ) => {
        event.preventDefault();
        this.setState({display:"display-block"})
       let userData = {};
       const url = "/api/v1/user/forget/password";
    const email = this.state.email.value;
       userData = {"email":email};
        fetch(url, {
            method: "POST",
            body:JSON.stringify(userData),
            headers: {'Content-Type': "application/json"}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 201) {
                const displayPopMessage ={};             
                displayPopMessage.card = "card bg-success text-white";
                displayPopMessage.display = "row";
                displayPopMessage.message =response.message;
                this.setState({display:"display-none"})
                this.setState({popMessage:displayPopMessage});
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
        if(e) {window.location = "/user/forget/password?something-went-wrong-please-check-your-internet-connection-and-try-again."}
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
                                <h1>Forget Password</h1>
                                <span>A link will be  sent to your mail</span>
                            </div>
                            <span className={this.state.emailError.display}>{this.state.emailError.value}</span>
                            <form onSubmit={this.sendEmailHandler}>
                                <div className="col-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="mail">Email address</label>
                                            <input type="email" placeholder="Enter your mail" className="form-control" onChange={(event) => this.setEmail(event,this.state.email.id)} id={this.state.email.id} value={this.state.email.value} required />
                                        </div>
                                    </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                    <input type="submit" className="form-control b-medik medik-color-secondary" name="Send" value="Send"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 card-footer">
                                <span>Go back to</span> <Link to="/login"><button className="btn-sm medik-color-secondary b-medik">Login</button></Link>
                                
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

export default UserForgetPassword;