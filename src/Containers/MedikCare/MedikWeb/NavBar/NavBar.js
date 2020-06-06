import React from 'react';
import { Link } from 'react-router-dom';
import NavBarHandler from './NavBarHandler';


const NavBar = () => {
  return (
     <header className="header client-nav-bar">
     	<nav className="navbar navbar-style row">
     		<div className="col-12 col-sm-4 col-md-4">
     		<ul className="nav">
			 <Link to="/index">
     			<li className="nav-item"><img  width="30%" src={"/MedikImage/MED3.png"} alt="logo"/></li>
			</Link>
     		</ul>
     		</div>
     		<div className=" col-12 col-sm-8 col-md-8">
				<NavBarHandler float="float-right" link="nav-link"/>
     		</div>
     	</nav>
     </header>
  )
}

export default NavBar;