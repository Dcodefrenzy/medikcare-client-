import React from 'react';
import connects  from "../Assets/svgs/connects.svg";
import ideas  from "../Assets/svgs/ideas.svg";
import { Link } from 'react-router-dom';
const Milestones = (props) => {
  return (
    <section className="overflow">
    	<div className="container home-content ">
    	    <div className="row milestone-content medik-color">
    			<div className="col-12 col-sm-12 col-md-12">
    				<h1 className="center medik-color">Saving the world one person at a time.</h1>
    			    <img src={connects} alt="connects-milestones" className='milestone-svg'/>
    			</div>
    			<div className="col-11 col-sm-12 col-md-8">
    				<h4 className="text-dark">Try Us Now,</h4>
    			    <h2 className="text-dark">Get Started In 10mins</h2>	
						<Link to="/registration">
							<button className="home-buttons nav-link btn-lg btn-medik">Get Started</button>
						</Link>
    			    
    			</div>
    			<div className="col-2 col-sm-12 col-md-2">
    				<img src={ideas} alt="ideas-milestones" className="milestone-width "/>
    			</div>
    		</div>
    	</div>
    </section>
  )
}

export default Milestones;