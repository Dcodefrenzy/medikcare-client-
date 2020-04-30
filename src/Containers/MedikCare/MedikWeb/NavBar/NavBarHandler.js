import React, { Component } from 'react';

import { Link } from 'react-router-dom';

const NavBarHandler = (props)=>{

	return (
			<ul className="nav float-right">
				<Link to="/">    			
     				<li className={`nav-item medik-color ${props.link}`}>Home</li>
				</Link>
     		      <li className="nav-item dropdown medik-color">
				    <a className={`${props.link} dropdown-toggle`} role="button">For Doctors</a>
				    <div className="dropdown-menu">
				  		<Link to="/doctor/registration">   			
     						<span className={`nav-item medik-color ${props.link}`}>Register</span>
						</Link> 
				  		<Link to="/doctor/login">   			
     						<span className={`nav-item medik-color ${props.link}`}>Login</span>
						</Link> 
				    </div>
				  </li>
				  <Link to="/blog">   			
     				<li className={`nav-item medik-color ${props.link}`}>Blog</li>
				</Link>
				<Link to="/login">    			
     				<li className={`nav-item medik-color ${props.link}`}>Login</li>
				</Link>
				<Link to="/registration">
     				<li className="nav-item"><button className="home-buttons nav-link btn-sm btn-medik">Get Started</button></li>
				</Link>
     		</ul>
		);
}

export default NavBarHandler;
