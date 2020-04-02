import React, { useState, useEffect } from 'react';
import health_questions  from '../../../Assets/svgs/answers.svg';
import chat  from '../../../Assets/svgs/waitingList.svg';
import todo  from '../../../Assets/svgs/blog.svg';
import conversiation  from '../../../Assets/svgs/appointment.svg';
import Payment  from '../../../Assets/svgs/payment.svg';
import { Link } from 'react-router-dom'

const DoctorDashboardDetails = (props) => {
	const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
	const sendNotification=()=>{

		const OneSignal = window.OneSignal || []; 
		OneSignal.push(function() { 
			OneSignal.getUserId().then(function(userId) {
	
				if (userId) {	
				const url = "/api/v1/doctor/update/notification/"+userId;
				fetch(url, {
					method: "PATCH",
					headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
				})
				.then(res => res.json())
				.then(response => { 
					if(response.status === 401) {
					sessionStorage.removeItem("doctor");
						window.location = "/doctor/login?Session expired please login."
					}else if (response.status === 200) {
						
					}
				})
				}
				
			
			})
		});
	}
	useEffect(()=>{
		sendNotification();
	  }, [])
	
    return(
        <div className="">
    	<div className="container home-content">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6"><h6>Good Day DR {props.welcomeName}</h6><img /></div>
    		<div className="row">
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
					<Link to="/health/questions" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">HEALTH QUESTIONS</h3>
                                <button className="btn btn-sm btn-medik top-margin-md">Answer</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ health_questions } alt="Post health questions" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
				<Link to="/chat/doctors/doctor" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">Patient Waiting List</h3>
                                <button className="btn btn-sm btn-medik top-margin-md">Patient</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ chat } alt="consult using our application with doctors" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>PYSICAL SESSION</h3>

                                <button className="btn btn-sm btn-medik top-margin-md">Appointments</button>
								<p>Coming Soon!</p>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ conversiation } alt="consult using our application with doctors" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>CME</h3>
                                <button className="btn btn-sm btn-medik top-margin-md">View</button>
								<p>Coming Soon!</p>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ todo } alt="articles" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    )
}

export default DoctorDashboardDetails;