import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';

const NavBarLink = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    
    const setLogoutHandler=(event)=>{
        event.preventDefault();
        const url = "/api/v1/admins/logout";
        fetch(url, {
            method: "PATCH",
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
                window.location = "/admin/login?Session expired please login."
            }else if (response.status === 201) {
                sessionStorage.removeItem("admin");
                window.location = "/admin/login?Logout successful."
            }
        })
    }
    return (
        <ul className="sidebar-sticky">
        <Link to="/admin/dashboard"> 
        <li className={"nav-item nav-link "+props.color}><i className="fa fa-dashboard"></i> Dashboard</li>
        </Link>
        <Link to="/admin/admins"> 
        <li className={"nav-item nav-link "+props.color}><i className="fa fa-users"></i> Admins</li>
        </Link>
        <Link to="/admin/users">
            <li className={"nav-item nav-link "+props.color}><i className="fa fa-users"></i> Users</li>
        </Link>
        <Link to="/admin/doctors">
        <li className={"nav-item nav-link "+props.color}><i className="fa fa-user-md"></i> Doctors</li>
        </Link>
        <li onClick={(event)=>setLogoutHandler(event)} className={"nav-item nav-link "+props.color}><i className="fa fa-sign-out"></i>Logout</li>
    </ul>
    )
}

export default NavBarLink;