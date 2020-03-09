import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

const DoctorsDetails = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [spinner, setSpinner] = useState({display:"", text:""})
    const resendUserMail = (event, id)=>{
        console.log(id)
        setSpinner({display:"fa fa-spinner fa-spin",text:""})
        const url = "/api/v1/admins/resend-doctor-mail/"+id;
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
                <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                        <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                            <button className="btn-sm btn-medik" onClick={props.clicked}>Go back</button>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header b-medik"></div>
                                    <div className="card-body">
                                       <div className="row">
                                       <div className="col-12 col-sm-6 col-md-6">
                                           <p><img src={"/Images/"+props.image} className="50%" alt="user-profile" /></p>
                                           <p><b>Name:</b> {props.name}</p>
                                            <p><b>Gender:</b> {props.gender}</p>
                                            <p><b> Age:</b> <Moment fromNow>{props.age}</Moment></p>
                                            <p><b>Email:</b> {props.email}</p>
                                            <p><b>Phonenumber</b> {props.phonenumber}</p>
                                            <p><b>Verification:</b> {props.verification}</p>
                                            <p><b>Login Status:</b> {props.loginStatus}</p>
                                            <p><b>Last Login:</b> <Moment fromNow>{props.lastLogin}</Moment></p>
                                            <p><b>Date Created:</b><Moment fromNow>{props.dateCreated}</Moment></p>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                        <p><b>Address:</b> {props.address}</p>
                                        <p><b>Degree:</b> {props.degree}, <b>Folio No:</b> {props.folio}</p>
                                        <p><b>School:</b> {props.school}</p>
                                        <p><b>Specialty:</b> {props.specialty}, <b>Year of Grad:</b><Moment fromNow>{props.year}</Moment></p>
                                        <p>Verification: {props.verification} <button onClick={(event) => resendUserMail(event, props._id)} className={`btn btn-sm btn-medik ${props.verificationButton}`}>Send Mail</button><i className={spinner.display}>{spinner.text}</i></p>   
                                      
                                        <p><b>Admin Verification:</b>{props.verify} <b>Profile:</b> {props.profileCompleted}</p>                       
                                        </div>
                                        <div className="col-12 col-sm-6 offset-sm-3 col-md-6 0ffset-md-3">
                                            <div className={"card bg-success text-white "+props.messageDisplay}>
                                                <div className="card-body">
                                                    <h5 className={props.messageDisplay}>{props.message} <i className="fa fa-check"></i></h5>
                                                </div>
                                            </div>
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

export default DoctorsDetails;