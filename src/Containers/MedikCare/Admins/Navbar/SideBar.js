import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
      <div className="col-0 col-sm-2 col-md-2 col-lg-1 d-none d-md-block ">
        <div className="card sidebar">
              <ul className="sidebar-sticky">
                <Link to="/admin/dashboard"> 
                <li className="nav-item nav-link medik-color"><i className="fa fa-dashboard"></i> Dashboard</li>
                </Link>
                <Link to="/admin/admins"> 
                <li className="nav-item medik-color nav-link"><i className="fa fa-users"></i> Admins</li>
                </Link>
                <li className="nav-item medik-color nav-link"><i className="fa fa-users"></i> Users</li>
                <li className="nav-item medik-color nav-link"><i className="fa fa-user-md"></i> Doctors</li>
              </ul>
           </div>
      </div>
    )
}

export default SideBar;
