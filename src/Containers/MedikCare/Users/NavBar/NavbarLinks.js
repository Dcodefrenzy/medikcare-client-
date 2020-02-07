import React from 'react';
import { Link } from 'react-router-dom';



const NavbarLinks = () => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    
    const setLogoutHandler=(event)=>{
        event.preventDefault();
        const url = "/api/v1/user/logout";
        fetch(url, {
            method: "PATCH",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
            }else if (response.status === 201) {
                sessionStorage.removeItem("user");
                window.location = "/login?Logout successful."
            }
        })
    }
    return (
            <div className="col-12">
                <ul className="nav justify-content-center">
                    <div className="col-2 ">
                        <Link to="/user/dashboard">
                            <li className="nav-item"><i className="fa fa-home"></i>Home</li>
                        </Link>
                    </div>
                    <div className="col-2">
                        <Link to="/user/profile">
                            <li className="nav-item"><i className="fa fa-user"></i>Profile</li>
                        </Link>
                    </div>
                    <div className="col-2">
                        <Link to="/chat/doctors">
                            <li  className="nav-item"><i className="fa fa-envelope"></i>Chat</li>
                        </Link>
                    </div>
                    <div className="col-2">
                        <Link to="/user/Settings">
                            <li className="nav-item"><i className="fa fa-cogs"></i>Settings</li>
                        </Link>
                    </div>
                    <div className="col-2">
                            <li onClick={(event)=>setLogoutHandler(event)}><i className="fa fa-sign-out"></i>Logout</li>
                    </div>
                </ul>
            </div>
    )
}

export default NavbarLinks;