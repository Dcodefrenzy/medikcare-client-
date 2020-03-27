import React, { useState, useEffect } from 'react';
import health_questions  from '../../Assets/svgs/health_questions.svg';
import chat  from '../../Assets/svgs/chat2.svg';
import goals  from '../../Assets/svgs/health_goals.svg';
import todo  from '../../Assets/svgs/todo.svg';
import conversiation  from '../../Assets/svgs/appointment.svg';
import chat1  from '../../Assets/svgs/chat1.svg';
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading';

const DashboardDetails = (props) => {

	const sessionItem = JSON.parse(sessionStorage.getItem("user"));
	const [user, setUser] = useState({});
	const [file, setFile]  = useState({});
	const [logs, setLogs ] = useState({length:0});
	const [display, setDisplay]  = useState({display:"block"});
  
	const setUserDisplayHandler=()=>{
	  const url = "/api/v1/user/profile";
	  fetch(url, {
		  method: "GET",
		  headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
	  })
	  .then(res => res.json())
	  .then(response => { 
		  if(response.status === 401) {
			 sessionStorage.removeItem("user");
			  window.location = "/login?Session expired please login."
		  }else if (response.status === 200) {
			  setDisplay({display:"display-none"});
				setUser(response.message);
                if (response.message.image) {
                    setFile(response.message.image);
                }else{
                    setFile({filename:"user.png"});
                }
		  }
	  })
  }
  const setLogsHandler=()=>{
	const url = "/api/v1/logs/unread/user";
	fetch(url, {
		method: "GET",
		headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
	})
	.then(res => res.json())
	.then(response => { 
		if(response.status === 401) {
		   sessionStorage.removeItem("user");
			window.location = "/login?Session expired please login."
		}else if (response.status === 200) {
			setDisplay({display:"display-none"});
			  setLogs({length:response.message.length});
		}
	})
}
const sendNotification=()=>{

	const OneSignal = window.OneSignal || []; 
	OneSignal.push(function() { 
		OneSignal.getUserId().then(function(userId) {

			if (userId) {	
			const url = "/api/v1/user/update/notification/"+userId;
			fetch(url, {
				method: "PATCH",
				headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
			})
			.then(res => res.json())
			.then(response => { 
				if(response.status === 401) {
				sessionStorage.removeItem("user");
					window.location = "/login?Session expired please login."
				}else if (response.status === 200) {
					
				}
			})
			}
			
		
		})
	});
}




  useEffect(()=>{
	setUserDisplayHandler();
  }, [])

    
  useEffect(()=>{
	setLogsHandler();
	sendNotification();
  }, [])

    return(
		<div>
			<Loading display={display.display}/>
        <div className="user-section">
    	<div className="container home-content">
			<div className="row">
			<div className="col-12 col-sm-12 col-md-12 col-lg-12">
				<Link to="/user/main-activity">
					<i className="medik-color float-right fa fa-bell fa-2x"><small className="text-dark notify">{logs.length}</small></i>
				</Link>
			</div>	
			<div className="col-2 col-sm-2 col-md-1 col-lg-1">
				<img className="img-round" width="50px" height="50px" src={"/Images/"+file.filename} alt="admin-profile-image"/>
			</div>
            <div className="col-10 col-sm-6 col-md-6 col-lg-6">
				<h3>Good day, {user.firstname+" "+user.lastname}
				</h3></div>
			</div>
    		<div className="row">
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
					<Link to="/health/questions" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">HEALTH QUESTIONS</h3>
								<p className="text-dark top-margin-sm">Post health questions and get answers quickly.</p>
                                <button className="btn btn-sm btn-medik top-margin-md">Post</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ health_questions } alt="health-questions" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
				<Link to="/chat/doctors" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">TALK TO A DOC</h3>
								<p className="text-dark top-margin-sm">Connect with verified doctors online.</p>
                                <button className="btn btn-sm btn-medik top-margin-md">Talk</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ chat } alt="consult-doctors" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">	
				<Link to="/blog" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">MedikByte</h3>
								<p className="text-dark top-margin-sm">Learn about your health by reading health articles</p>
                                <button className="btn btn-sm btn-medik top-margin-md">Read</button>
							
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ todo } alt="articles" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
				
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>HEALTH VLOG</h3>
								<p className="text-dark top-margin-sm">Watch videos that explain healthy living.</p>
                                <button className="btn btn-sm btn-medik top-margin-md">Vlog</button>
								<p>Coming Soon!</p>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ chat1 } alt="treatment-plan" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>SESSIONS Appointments</h3>
								<p className="text-dark top-margin-sm">Book physical appointments with our Doctors.</p>
                                <button className="btn btn-sm btn-medik top-margin-md">Book</button>
								<p>Coming Soon!</p>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ conversiation } alt="book-sessions" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>HEALTH GOALS</h3>
								<p className="text-dark top-margin-sm">Set health goals and crush them hard.</p>
                                <button className="btn btn-sm btn-medik top-margin-md">Goal</button>
								<p>Coming Soon!</p>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ goals } alt="health-goals" className='home-svg'/>
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

export default DashboardDetails;