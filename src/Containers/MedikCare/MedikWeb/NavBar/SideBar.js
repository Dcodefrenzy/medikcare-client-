import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import NavBarHandler from "./NavBarHandler";

const SideBar = () => {
    const [navDisplay, setNavDisplay] = useState({display:"display-none"})
    const [iconDisplay, seticonDisplay] = useState({display:""})
    const setNavDisplayHandler = (event)=>{
        event.preventDefault();
        setNavDisplay({display:"block"})
        seticonDisplay({display:"display-none"})
    }
    const unSetNavDisplayHandler = (event)=>{
        event.preventDefault();
        setNavDisplay({display:"display-none"})
        seticonDisplay({display:""})
    }

  
    return (
        <header className="header client-side-bar">
                   
              <div className={`col-12 col-sm-12 col-md-6  ${navDisplay.display}`}>
                <div className="card  fixed">
                </div>
            </div>
                    <div className={"admin-nav fixed top-margin-lg "+ navDisplay.display}>
                        <main className="col-6 offset-3">
                            <li  className="nav-item nav-link medik-color"> <i onClick={(event)=>unSetNavDisplayHandler(event)} className={"fa fa-times medik-color fa-2x "+ navDisplay.display}></i></li>
                                <ul className={`sidebar-sticky`}>
			                        <Link to="/">    			
				                        <li className={`nav-item medik-color bottom-margin-sm`}>Home</li>
			                        </Link>
			                        <li className="nav-item dropdown medik-color bottom-margin-sm">
				                            <span className={` dropdown-toggle`} role="button">Health Plans</span>
				                        <div className="dropdown-menu">
                                        <Link to="/"> <span className="dropdown-item medik-color" href="#">Individuals</span> </Link>
				                        </div>
			                        </li>
			                        <Link to="blog">   			
				                        <li className={`nav-item medik-color bottom-margin-sm`}>Blog</li>
			                        </Link> 
			                         <Link to="/doctor/login">   			
				                        <li className={`nav-item medik-color bottom-margin-sm`}>Doctors</li>
			                        </Link> 
			                        <Link to="/login">    			
				                        <li className={`nav-item medik-color bottom-margin-sm`}>Login</li>
			                        </Link>
			                        <Link to="/registration">
				                        <li className="nav-item nav-link btn-sm btn-medik bottom-margin-sm">Get Started</li>
			                        </Link>
		                        </ul>
                        </main>
                    </div> 
            <nav className="navbar navbar-style row align-center">
                <div className="col-8 col-sm-8 col-md-4">
                <ul className="nav">
                <Link to="/index">
                    <li className="nav-item"><img  width="50%" src={"/MedikImage/MED3.png"} alt="logo"/></li>
               </Link>
                </ul>
                </div>
                <div className=" col-4 col-sm-4 col-md-8">
                   <i onClick={(event)=>setNavDisplayHandler(event)}   className="fa fa-bars fa-2x  medik-color"></i>
                </div>
            </nav>
        </header>
    )
}

export default SideBar;
