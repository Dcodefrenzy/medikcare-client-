import React from 'react';
import { Link } from 'react-router-dom';

const FullSideBar = () => {
    return (
      <div className="col-12 z-index">
        <div className="">
              <ul className="sidebar-sticky">
                  <li className="nav-item nav-link medik-color"><i className="fa fa-times fa-2x"></i></li>
                <Link to="/admin/dashboard"> 
                <li className="nav-item nav-link medik-color"><i className="fa fa-dashboard"></i> Dashboard</li>
                </Link>
                <Link to="/admin/admins"> 
                <li className="nav-item medik-color nav-link"><i className="fa fa-users"></i> Admins</li>
                </Link>
                <Link to="/admin/users">
                    <li className="nav-item medik-color nav-link"><i className="fa fa-users"></i> Users</li>
                </Link>
                <Link to="/admin/doctors">
                  <li className="nav-item medik-color nav-link"><i className="fa fa-user-md"></i> Doctors</li>
                </Link>
                <Link to="">
                  <li className="nav-item medik-color nav-link"><i className="fa fa-sign-out"></i>Logout</li>
                </Link>
              </ul>
           </div>
      </div>
    )
}

export default FullSideBar;
