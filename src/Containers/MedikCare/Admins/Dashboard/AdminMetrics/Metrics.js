import React, {useState, useEffect, useRef}  from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';

const Metrics = () => {

    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [metrics, setMetrics] = useState({});

   const setMetricHandler = ()=>{
       const url = "/api/v1/admins/metrics";
        fetch(url, {
            method:"GET",
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            if (response.status === 200) {
               console.log(response.message)
                setMetrics(response.message);
            }else{
                setMetrics({userMetric:0,doctorMetric:0,adsMetric:0,questionMetric:0,answerMetric:0});
                console.log(response)
            }
        })
    }

    useEffect(()=>{
        setMetricHandler();
    },[])
    return (

        <div className="row justify-content-center metric-card">
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 b-medik">
            <Link to="/admin/users">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8 text-white">
                        <h1>{metrics.userMetric}</h1>
                        <p>Registered users</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                        <i className="fa fa-users text-white"></i>
                   </div>
               </div>
               </Link>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-warning text-white">
            <Link to="/admin/doctors">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8 text-white">
                   <h1>{metrics.doctorMetric}</h1>
                   <p>Registered Doctors</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-user-md text-white"></i>
                   </div>
               </div>
               </Link>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-success text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                    <h1>{metrics.waitingListMetrics}</h1>
                   <p>Waiting List</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-heart"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-info text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                    <h1>{metrics.ongoingSessionsMetrics}</h1>
                   <p>Ongoing Sessions</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-users"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-oranged text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                    <h1>{metrics.endedSessionMetrics}</h1>
                   <p>Sessions Ended</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-users"></i>
                   </div>
               </div>
            </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-dark text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>{metrics.questionMetric}</h1>
                   <p>Questions Asked</p>   
                   </div>
                   <div className="col-4 col-sm-4 col-md-4">
                   <i className="fa fa-users"></i>
                   </div>
               </div>
                </div>
            <div className="card col-5 col-sm-5 col-md-5 col-lg-3 bg-primary text-white">
               <div className="row">
                   <div className="col-8 col-sm-8 col-md-8">
                   <h1>{metrics.answerMetric}</h1>
                   <p>Answers By Doctors</p>   
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
        </div>
    )
}

export default Metrics;
