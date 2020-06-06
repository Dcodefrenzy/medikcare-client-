import React from 'react';

const Metrics = () => {
    return (

        <div className="row justify-content-center metric-card">
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 b-medik medik-color-secondary">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                        <h1>1</h1>
                        <p>Registered users</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                        <i className="fa fa-users"></i>
                   </div>
               </div>
            </div> 
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-success text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Life Saved</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-heart"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-warning text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>1</h1>
                   <p>Registered Doctors</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-user-md"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-dark text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Sites Visitors</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-users"></i>
                   </div>
               </div>
                </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-info text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Consultation Sessions</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-users"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-primary text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Questions Answered</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-question-circle"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-crimson text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Hospitals</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-hospital-o"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-chocolate text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Phamacies</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa fa-medkit"></i>
                   </div>
               </div>
            </div>
            <div className="card col-10 col-sm-8 col-md-5 col-lg-3 bg-oranged text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>0</h1>
                   <p>Labs</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-plus-square"></i>
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Metrics;
