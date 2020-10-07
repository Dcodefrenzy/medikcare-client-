import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import NavBarLink from "./Links";


const NavBar = (props) => {
    const [navDisplay, setNavDisplay] = useState({display:"display-none"})
    const [iconDisplay, seticonDisplay] = useState({display:""})
    const setNavDisplayHandler = (event)=>{
        event.preventDefault();
        setNavDisplay({display:"block"});
        seticonDisplay({display:"display-none"});
    }
    const unSetNavDisplayHandler = (event)=>{
        event.preventDefault();
        setNavDisplay({display:"display-none"});
        seticonDisplay({display:""});
    }


    return(
            <nav className="navbar justify-content-around b-medik flex-md-nowrap p-0 shadow z-index ">
               <div className="admin-nav"> 
                    <i onClick={(event)=>setNavDisplayHandler(event)}  className={"fa fa-bars text-white fa-2x "+ iconDisplay.display}></i>
                   
               </div>
               <p className="medik-color-secondary">MedikCare Logo</p>
                <ul className="nav px-5">
                    <li className="dropdown medik-color">
                        <i className="fa fa-lg fa-user nav-link dropdown-toggle medik-color-secondary margin-right" role="button"></i>
                        <div className="dropdown-menu">
				            <Link to="/admin/profile" className="dropdown-item medik-color" href="#">Profile</Link>
                            <Link to="/admin/password/change" className="dropdown-item medik-color" href="#">Password</Link>
				        </div>
                    </li>
                </ul>
                <div className={"col-12 admin-nav "+ navDisplay.display}>
                    <div className="">
                    <li  className="nav-item nav-link text-white"> <i onClick={(event)=>unSetNavDisplayHandler(event)} className={"fa fa-times text-white fa-2x "+ navDisplay.display}></i></li>
                        <NavBarLink color="text-white" />
                    </div>
                </div>
            </nav>
    )
}

export default NavBar;
