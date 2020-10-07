import React from 'react';

const AdminDelete = (props) => {
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
                                       <div className="col-12 col-sm-6 col-md-6">
                                           <p>Do you want to {props.deleteDetails}  admin {props.name} ?</p>
                                            <button className="btn-sm btn-warning" onClick={props.clicked}>No</button><button className="btn-sm btn-danger" onClick={props.adminDelete}>Yes</button>
                                           </div>
                                        <div className="col-12 col-sm-6 col-md-6 card">
                                        <h3>Note! Before you delete.</h3>
                                        <p>To delete an admin you have to ensure that he or she have with no doubt broken any of the laws of the company or in some cases he or she has left the company.</p>
                                        <p>Suspension means this person has person will not be able to have access to his or her account and might lead to some work left undone.</p>
                                        <p>Lastly admins can be reinstated.</p>
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


export default AdminDelete