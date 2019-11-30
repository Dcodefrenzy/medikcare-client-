import React from 'react';
import health_questions  from '../../Assets/svgs/health_questions.svg';
import chat  from '../../Assets/svgs/chat2.svg';
import goals  from '../../Assets/svgs/health_goals.svg';
import todo  from '../../Assets/svgs/todo.svg';
import conversiation  from '../../Assets/svgs/conversiation.svg';
import { Link } from 'react-router-dom'

const DashboardDetails = (props) => {
    return(
        <section className="user-section">
    	<div className="container home-content">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6"><h1>Good day Ayodeji Fakunle</h1><img /></div>
    		<div className="row">
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
					<Link to="/health/questions" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">HEALTH QUESTIONS</h3>
                                <button className="btn btn-sm btn-medik">Post a question</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ health_questions } alt="health-questions" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>CONSULTATION</h3>
                                <button className="btn btn-sm btn-medik">Talk to a doctor</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ chat } alt="consult-doctors" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>PYSICAL CONSULTATION</h3>

                                <button className="btn btn-sm btn-medik">Book a session</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ conversiation } alt="book-sessions" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>TREATMENT PLAN</h3>
                                <button className="btn btn-sm btn-medik">Treatment plan</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ todo } alt="treatment-plan" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>HEALTH GOALS</h3>
                                <button className="btn btn-sm btn-medik">Join an health goal</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ goals } alt="health-goals" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>HEALTH ARTICLES</h3>
                                <button className="btn btn-sm btn-medik">Read health articles</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ todo } alt="articles" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
    )
}

export default DashboardDetails;