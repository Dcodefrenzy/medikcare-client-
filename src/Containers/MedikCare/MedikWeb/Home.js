import React from 'react';
import doctors from '../Assets/svgs/home_doctors.svg';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
  	<section className="home-section">
	    <div className="container">
	    	<div className="row">
	    		<div className="col-12 col-sm-12 col-md-6 home-image"> 
	    			<img src={doctors} alt="Talk to doctors on our application" className='home-svg img-fluids'/>
	    		</div>
	    		<div className="col-12 col-sm-12 col-md-6 top-margin-md">
	    			<div className="home-content">
	    				<h1 className="medik-color">Talk to a Doctor Online.</h1>
	    				<p>We connect you to a verified doctor for remote consultation in minutes.</p>
	    				<p className="medik-color">Get started for free!!</p>		
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

export default Home;