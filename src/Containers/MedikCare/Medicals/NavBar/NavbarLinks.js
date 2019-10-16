import React from 'react';



const NavbarLinks = () => {
    return (
            <div className="col-12">
                <ul className="nav justify-content-center">
                    <div className="col-2 ">
                        <li className="nav-item"><i className="fa fa-home"></i>Home</li>
                    </div>
                    <div className="col-2">
                    <   li className="nav-item"><i className="fa fa-user"></i>Profile</li>
                    </div>
                    <div className="col-2">
                        <li><i className="fa fa-envelope"></i>Chat</li>
                    </div>
                    <div className="col-2">
                     <li><i className="fa fa-newspaper-o "></i>Articles</li>
                    </div>
                    <div className="col-2">
                     <li><i className="fa fa-sign-out"></i>Logout</li>
                    </div>
                </ul>
            </div>
    )
}

export default NavbarLinks;