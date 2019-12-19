import React from 'react';
import { Link } from 'react-router-dom';



const NavbarLinks = () => {
    const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
    const setLogoutHandler=(event)=>{
        event.preventDefault();
        const url = "http://192.168.33.12:3000/api/v1/doctor/logout";
        fetch(url, {
            method: "PATCH",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("doctor");
                window.location = "/doctor/login?Session expired please login."
            }else if (response.status === 201) {
                sessionStorage.removeItem("user");
                window.location = "/doctor/login?Logout successful."
            }
        })
    }
    return (
            <div className="col-12">
                <ul className="nav justify-content-center">
                    <div className="col-2 ">
                        <Link to="/doctor/dashboard">
                            <li className="nav-item"><i className="fa fa-home"></i>Home</li>
                        </Link>
                    </div>
                    <div className="col-2">
                        <Link to="/doctor/profile">
                            <li className="nav-item"><i className="fa fa-user"></i>Profile</li>
                        </Link>
                    </div>
                    <div className="col-2">
                        <li><i className="fa fa-envelope"></i>Chat</li>
                    </div>
                    <div className="col-2">
                     <li><i className="fa fa-newspaper-o "></i>Articles</li>
                    </div>
                    <div className="col-2">
                        <li onClick={(event)=>setLogoutHandler(event)}><i className="fa fa-sign-out"></i>Logout</li>
                    </div>
                </ul>
            </div>
    )
}

export default NavbarLinks;