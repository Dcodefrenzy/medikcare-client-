import React from 'react';
import started1  from '../Assets/svgs/started2.svg';
import { Link } from 'react-router-dom';

const GetStarted = (props) => {
  return (
    <section className="b-medik-color-secondary">
    	<div className="container home-content">
    	    <div className="row">
    			<div className="col-12 col-sm-12 col-md-7">
    					<img src={started1} alt="getting started with medikcare" className="home-svg"/>
    			</div>
    			<div className="col-10 col-sm-12 col-md-4 service-container">
    				<div className="started-content">
    				 <h1 className="">Get Started In 10mins.</h1>
    					<h5><i className="square card"></i> Create an account.</h5>
    					<p>Sign up for an account with your name, email and phone number.</p>
    					<h5><i className="square card"></i> Post a health question.</h5>
    					<p>Ask a doctor anything and get response in not more than 10mins.</p>
    					<h5><i className="square card"></i> Get a treatment plan.</h5>
    					<p>Get a treatment plan that suits you.</p>	
						<Link to="/registration">
							<button className="home-buttons nav-link btn-lg btn-medik">Get Started</button>
						</Link>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
  )
}

export default GetStarted;