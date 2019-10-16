import React from 'react';
import health_questions  from '../../../Assets/svgs/answers.svg';
import chat  from '../../../Assets/svgs/waitingList.svg';
import todo  from '../../../Assets/svgs/blog.svg';
import conversiation  from '../../../Assets/svgs/appointment.svg';
import { Link } from 'react-router-dom'

const DoctorDashboardDetails = (props) => {
    return(
        <section className="user-section">
    	<div className="container home-content">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6"><h1>Good Day DR {props.welcomeName}</h1><img /></div>
    		<div className="row">
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
					<Link to="/health/questions" className="href">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3 className="text-dark">HEALTH QUESTIONS</h3>
                                <button className="btn btn-sm btn-medik">Answer questions</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ health_questions } alt="Post health questions" className='home-svg'/>
    						</div>
    					</div>
    				</div>
					</Link>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>Waiting List</h3>
                                <button className="btn btn-sm btn-medik">Speak to a patience</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ chat } alt="consult using our application with doctors" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>PYSICAL CONSULTATION</h3>

                                <button className="btn btn-sm btn-medik">Session appointments</button>
    						</div>
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6">
    							 <img src={ conversiation } alt="consult using our application with doctors" className='home-svg'/>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12 col-lg-6 user-dashboard-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-6 col-sm-6 col-md-6 col-lg-6 user-dashboard-content">
    							<h3>HEALTH ARTICLES</h3>
                                <button className="btn btn-sm btn-medik">Post health articles</button>
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

export default DoctorDashboardDetails;