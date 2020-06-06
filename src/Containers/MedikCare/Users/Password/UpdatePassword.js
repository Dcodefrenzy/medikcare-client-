import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';

const UserUpdatePassword = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    const [oldPassword, setOldPassword] = useState({id:"oldPassword", value:"", type:"password"})
    const [oldPasswordError, setoldPasswordError] = useState({id:"oldPasswordError", display:"display-none", value:"",})

    const [newPassword, setnewPassword] = useState({id:"newPassword", value:"", type:"password"})
    const [newPasswordError, setnewPasswordError] = useState({id:"newPasswordError", display:"display-none", value:"",})
    const oldPasswordChangedHandler =(event)=>{
        if (event.target.value !=="" && event.target.value.length < 6) {
            setoldPasswordError({id:"oldPasswordError", display:"display-block", value:"Your password must be more than 6 characters"})
        }else {
            setoldPasswordError({id:"oldPasswordError", display:"display-none", value:"",})
        }
        setOldPassword({id:"oldPassword", value:event.target.value, type:"password"})
    }
    const newPasswordChangedHandler =()=>{
        if (event.target.value !=="" && event.target.value.length < 6) {
            setnewPasswordError({id:"newPasswordError", display:"display-block", value:"Your password must be more than 6 characters"})
        }else {
            setnewPasswordError({id:"newPasswordError", display:"display-none", value:"",})
        }
        
        setnewPassword({id:"oldPassword", value:event.target.value, type:"password"})
    }
    const setPasswordHadler=(event)=>{
        event.preventDefault();
       let passwordData ={};
        passwordData = {"oldPassword": oldPassword.value,"newPassword": newPassword.value};
        console.log(passwordData)
        const url = "/api/v1/user/password/change";
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(passwordData),
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
            }else if (response.status === 201) {
                sessionStorage.removeItem("user");
                window.location = "/login?Password change was successful please login again, Thanks."
            }
        })
    }
    return (
        <div> 
        <section>
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-8">
                            <div className="card">
                                <div className="card-header b-medik"></div>
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                    <form onSubmit={setPasswordHadler}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="oldPasswor">Old Password</label>
                                                <input id={oldPassword.id} onChange={(event) => oldPasswordChangedHandler(event, oldPassword.id)} type={oldPassword.type} className="form-control" min="3" aria-describedby="Old password" name="oldPassword" value={oldPassword.value} placeholder="Password" required />
                                                <span id={oldPasswordError.id} className={oldPasswordError.display}>{oldPasswordError.value}</span>
                                            </div>
                                         </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="password">New Password</label>
                                                <input id={newPassword.id} onChange={(event) => newPasswordChangedHandler(event, newPassword.id)} type={newPassword.type} className="form-control" min="3" aria-describedby="New password" name="newPassword" value={newPassword.value} placeholder="Password" required />
                                                <span id={newPasswordError.id} className={newPasswordError.display}>{newPasswordError.value}</span>
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input className="btn-medik form-control" type="submit" name="update" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                    </div>
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

export default UserUpdatePassword;