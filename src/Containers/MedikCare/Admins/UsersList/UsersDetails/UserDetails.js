import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const UserDetails = (props) => {
    
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [spinner, setSpinner] = useState({display:"", text:""})
    const resendUserMail = (event, id)=>{
        setSpinner({display:"fa fa-spinner fa-spin",text:""})
        const url = "/api/v1/admins/resend-user-mail/"+id;
       fetch(url,{
           method:"GET",
           headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
       })
       .then(res=>res.json())
       .then(response=>{
           if (response.status === 200) {  
             setSpinner({display:"text-success",text:"Mail Send"})
           }else {
             setSpinner({display:"text-danger",text:"Could not send mail please try again latter."})
           }
       })
    }
    return (
        <div className={" " + props.display}>     
            <div className="admin-details-fixed top-padding-lg">
                <div className="col-11 col-sm-12 col-md-8 offset-md-2">
                        <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                            <button className="btn-sm btn-medik" onClick={props.clicked}>Go back</button>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header b-medik"></div>
                                    <div className="card-body">
                                       <div className="row">
                                       <div className="col-12 col-sm-6 col-md-6"><p><img src={"/Images/"+props.image} width="50%" alt="user-profile" /></p></div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                        <p>Name: {props.name}</p>
                                        <p>Gender: {props.gender}</p>
                                        <p> Age: <Moment fromNow>{props.age}</Moment></p>
                                        <p>Email: {props.email}</p>
                                        <p>Phonenumber {props.phonenumber}</p>
                                        <p>Verification: {props.verification} <button onClick={(event) => resendUserMail(event, props._id)} className={`btn btn-sm btn-medik ${props.verificationButton}`}>Send Mail</button><i className={spinner.display}>{spinner.text}</i></p>
                                        <p>Login Status: {props.loginStatus}</p>
                                        <p>Last Login: <Moment fromNow>{props.lastLogin}</Moment></p>
                                        <p>Date Created: <Moment fromNow>{props.dateCreated}</Moment></p>
                                       
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails