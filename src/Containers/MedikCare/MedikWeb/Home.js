import React from 'react';
import doctors from '../Assets/svgs/home_doctors.svg'

const Home = (props) => {
  return (
  	<section className="home-section">
	    <div className="container">
	    	<div className="row">
	    		<div className="col-12 col-sm-12 col-md-6">
	    			<div className="home-content">
	    				<h1 className="medik-color">Talk to a Doctor Online.</h1>
	    				<p>We connect you to a verified doctor for remote consultation in minutes.</p>
	    				<p className="medik-color">Get started for free!!</p>
	    					<button className="btn-lg btn-medik home-buttons">Get Started</button>
	    			</div>
	    		</div>
	    		<div className="col-12 col-sm-12 col-md-6 home-image"> 
	    			<img src={doctors} className='home-svg img-fluids'/>
	    		</div>
	    	</div>
	    </div>
	</section>
  )
}

export default Home;