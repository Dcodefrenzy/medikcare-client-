import React from 'react';


const UserDetails = (props) => {
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
                                       <div className="col-12 col-sm-6 col-md-6"><p><img src={props.image} alt="user-profile" /></p></div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                        <p>Name: {props.name}</p>
                                        <p>Gender: {props.gender}</p>
                                        <p> Age: {props.age}</p>
                                        <p>Email: {props.email}</p>
                                        <p>Phonenumber {props.phonenumber}</p>
                                        <p>Verification: {props.verification}</p>
                                        <p>Login Status: {props.loginStatus}</p>
                                        <p>Last Login: {props.lastLogin}</p>
                                        <p>Date Created: {props.dateCreated}</p>
                                       
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

export default UserDetails