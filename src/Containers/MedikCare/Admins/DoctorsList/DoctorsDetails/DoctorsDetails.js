import React from 'react';


const DoctorsDetails = (props) => {
    return (
        <div className={" " + props.display}>     
            <section className="admin-details-fixed">
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
                                           <p><img src={props.image} alt="user-profile" /></p>
                                           <p><b>Name:</b> {props.name}</p>
                                            <p><b>Gender:</b> {props.gender}</p>
                                            <p><b> Age:</b> {props.age}</p>
                                            <p><b>Email:</b> {props.email}</p>
                                            <p><b>Phonenumber</b> {props.phonenumber}</p>
                                            <p><b>Verification:</b> {props.verification}</p>
                                            <p><b>Login Status:</b> {props.loginStatus}</p>
                                            <p><b>Last Login:</b> {props.lastLogin}</p>
                                            <p><b>Date Created:</b> {props.dateCreated}</p>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                        <p><b>Address:</b> {props.address}</p>
                                        <p><b>Degree:</b> {props.degree}</p>
                                        <p><b>Folio No:</b> {props.folio}</p>
                                        <p><b>School:</b> {props.school}</p>
                                        <p><b>Specialty:</b> {props.specialty}</p>
                                        <p><b>Mail Verification:</b> {props.verification}</p>
                                        <p><b>Year of Grad:</b> {props.year}</p>    
                                        <p><b>Profile:</b> {props.profileCompleted}</p>
                                        <p><b>Admin Verification:</b>{props.verify}</p>                       
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
            </section>
        </div>
    )
}

export default DoctorsDetails;