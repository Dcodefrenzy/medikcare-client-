import React from 'react';


const NavBar = (props) => {

    return(
            <nav className="navbar justify-content-around b-medik flex-md-nowrap p-0 shadow z-index ">
                <p className="medik-color-secondary">Medik Care</p>
               <p className="medik-color-secondary">MedikCare Logo</p>
                <ul className="nav px-5">
                    <li className="dropdown medik-color">
                        <i className="fa fa-lg fa-user nav-link dropdown-toggle medik-color-secondary margin-right" role="button"></i>
                        <div className="dropdown-menu">
				            <a className="dropdown-item medik-color" href="#">Profile</a>
                            <a className="dropdown-item medik-color" href="#">Password</a>
                            <a className="dropdown-item medik-color" href="#">Sign up</a>
				        </div>
                    </li>
                </ul>
            </nav>
    )
}

export default NavBar;
