import React from 'react';
import connects  from "../Assets/svgs/connects.svg"
import ideas  from "../Assets/svgs/ideas.svg"
const Milestones = (props) => {
  return (
    <section className="overflow">
    	<div className="container home-content">
    	  	    <h1 className="medik-color center">Milestones</h1>
    	    <div className="row milestone-content">
    			<div className="col-6 col-sm-6 col-md-4">
    			    	<h5>0</h5>
    					<p>Doctors.</p>
    			</div>
    			<div className="col-6 col-sm-6 col-md-4">
    			    	<h5>0</h5>
    					<p>Users/Members.</p>
    			</div>
    			<div className="col-6 col-sm-6 col-md-4">
    			    	<h5>0</h5>
    					<p>Answers Served.</p>
    			</div>
    			<div className="col-6 col-sm-6 col-md-4">
    			    	<h5>0</h5>
    					<p>States Reached.</p>
    			</div>
    			<div className="col-6 col-sm-6 col-md-4">
    			    	<h5>0</h5>
    					<p>Acive Users.</p>
    			</div>
    			<div className="col-6 col-sm-6 col-md-4">
    			    	<h5>0</h5>
    					<p>specialties</p>
    			</div>
    			<div className="col-12 col-sm-12 col-md-12">
    				<h1 className="center">Saving the world one person at a time.</h1>
    			    <img src={connects} className='milestone-svg'/>
    			</div>
    			<div className="col-11 col-sm-12 col-md-8">
    				<h4>Try Us Now,</h4>
    			    <h2>Get Started In 10mins</h2>
    			    <button className="btn btn-lg btn-medik">Get Started.</button>
    			    
    			</div>
    			<div className="col-2 col-sm-12 col-md-2">
    				<img src={ideas} className="milestone-width "/>
    			</div>
    		</div>
    	</div>
    </section>
  )
}

export default Milestones;