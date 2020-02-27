import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';

const LoginSession = (props) => {
    
    const [email, setEmail] = useState({id:"email", value:"", type:"email"});
    const [password, setPassword] = useState({id:"password", value:"", type:"password"});
    
    const [error, setError] = useState({display:"display-none", value:""});

    const emailHandler =(event)=>{
        setEmail({id:"email", value:event.target.value, type:"email"})
    }
    const passwordHandler =(event)=>{

        setPassword({id:"password", value:event.target.value, type:"password"})
    }

    const setSessionLoginHandler=(event)=>{
        event.preventDefault();
        const userData = {"email":email.value, "password":password.value};
       const url = "/api/v1/user/login";
        fetch(url, {
            method: "POST",
            body:JSON.stringify(userData),
            headers: {'Content-Type': "application/json"}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 200) {
                sessionStorage.setItem("user", JSON.stringify(response));
                console.log("yay worked!")
             }else if(response.status === 403) {
                setError({display:"display-block", value:response.value})
             }else if(response.status === 400) {  
                
                setError({display:"display-block", value:response.value})
             }
        })
    }
    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
            <div className="card opacity fixed">
                <section className="section">
                    
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 top-margin-lg">
                <div className="card bg-dark ">
                            <div className="card-header text-white  home-content">
                                <h1>Login</h1>
                                <span>login session has expired please login</span>
                                
                            <span className={error.display}>{error.value}</span>
                            </div>
                            <form onSubmit={setSessionLoginHandler}>
                                <div className="col-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="mail">Email address</label>
                                            <input type="email" id={email.id} onChange={(event) => emailHandler(event, email.id)} placeholder="Enter your mail" className="form-control"  required />
                                        </div>
                                    </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="mail">Password</label>
                                            <input type="password" id={password.id} onChange={(event) => passwordHandler(event, password.id)} placeholder="Enter your password" className="form-control"  required />
                                        </div>
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                    <input type="submit" className="form-control btn-white text-dark" name="Send" value="Send"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 card-footer">
                                
                                </div>              
                            </form>
                        </div>
                        </div>
                </section>
            </div>
            </div>
        </div>
    )
}

export default LoginSession;