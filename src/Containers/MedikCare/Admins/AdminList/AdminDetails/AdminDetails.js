import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const AdminDetails = (props) => {
    return (
        <div className={"container " + props.display}>     
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
                                       <div className="col-12 col-sm-6 col-md-6"><p><img src={props.image} alt="admin-profile" /></p></div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                        <p>Name: {props.name}</p>
                                        <p>Level: {props.level}</p>
                                        <p>Email: {props.email}</p>
                                        <p>Phonenumber {props.phonenumber}</p>
                                        <p>Verification: {props.verification}</p>
                                        <p>Date Created: <Moment fromNow>{props.dateCreated}</Moment></p>
                                        <p>Created by: {props.createdBy}</p>
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

export default AdminDetails