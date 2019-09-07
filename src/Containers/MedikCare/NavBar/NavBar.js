import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
  return (
     <header className="header">
     	<nav className="navebar navbar-style row">
     		<div className="col-12 col-sm-4 col-md-4">
     		<ul className="nav">
     			<li className="nav-item"><p className="nav-link">MedikCare</p></li>
     		</ul>
     		</div>
     		<div className=" col-12 col-sm-8 col-md-8">
     		<ul className="nav float-right">
     		    <li className="nav-item"><a className="nav-link medik-color" href="">Why medikCare</a></li>
     		      <li className="nav-item dropdown medik-color">
				    <a className="nav-link dropdown-toggle" role="button">Health Plans</a>
				    <div className="dropdown-menu">
				      <a className="dropdown-item medik-color" href="#">Individuals</a>
				    </div>
				  </li>
				<li className="nav-item"><a className="nav-link medik-color" href="">FAQ</a></li> 
				<Link to="/login">    			
     				<li className="nav-item"><a className="nav-link medik-color" href="">Login</a></li>
				</Link>
				<Link to="/registration">
     				<li className="nav-item"><button className="home-buttons nav-link btn-sm btn-medik">Get Started</button></li>
				</Link>
     		</ul>
     		</div>
     	</nav>
     </header>
  )
}

export default NavBar;