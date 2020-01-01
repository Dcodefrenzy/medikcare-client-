import React from 'react';
import health_questions  from '../Assets/svgs/health_questions.svg'
import chat  from '../Assets/svgs/chat1.svg'
import goals  from '../Assets/svgs/health_goals.svg'
import todo  from '../Assets/svgs/todo.svg'

const Services = (props) => {
  return (
    <section>
    	<div className="container home-content">
    	    <h1 className="medik-color">Services</h1>
    		<div className="row">
    			<div className="col-12 col-sm-12 col-md-6 service-container">
    				<div className="card">
    					<div className="row">
							
						<div className="col-12 col-sm-6 col-md-12 col-lg-6">
    							 <img src={ health_questions } alt="Post health questions" className='home-svg'/>
    						</div>
    						<div className="col-12 col-sm-6 col-md-12 col-lg-6 service-content">
    							<h3>POST A HEALTH QUESTION</h3>
    							<p>Ask a doctor anythingConfidential and secure.</p>
    							<button className="btn btn-sm btn-medik">Read More</button>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 service-container">
    				<div className="card">
    					<div className="row">
						<div className="col-12 col-sm-6 col-md-12 col-lg-6">
    							 <img src={ chat } alt="consult using our application with doctors" className='home-svg'/>
    						</div>
    						<div className="col-12 col-sm-6 col-md-12 col-lg-6 service-content">
    							<h3>ONLINE CONSULTATION</h3>
    							<p>Instant consult, Find the best doctor and Get a treatment plan.</p>
    							<button className="btn btn-sm btn-medik">Read More</button>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 service-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-12 col-sm-6 col-md-12 col-lg-6">
    							 <img src={ todo } alt="Get treatment plan" className='home-svg'/>
    						</div>
    						<div className="col-12 col-sm-6 col-md-12 col-lg-6 service-content">
    							<h3>TREATMENT PLAN</h3>
    							<p>Our Treatment Plans make it easy to follow your doctor's orders.</p>
    							<button className="btn btn-sm btn-medik">Read More</button>
    						</div>
    					</div>
    				</div>
    			</div>
    			<div className="col-12 col-sm-12 col-md-6 service-container">
    				<div className="card">
    					<div className="row">
    						<div className="col-12 col-sm-6 col-md-12 col-lg-6">
    							 <img src={ goals } alt="set health goals" className='home-svg'/>
    						</div>
    						<div className="col-12 col-sm-6 col-md-12 col-lg-6 service-content">
    							<h3>SET HEALTH GOALS</h3>
    							<p>Set health goals and recieve notifications till you knock them all.</p>
    							<button className="btn btn-sm btn-medik">Read More</button>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
  )
}

export default Services;