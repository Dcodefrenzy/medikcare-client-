import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const Blog = (props)=>{

    return (
        <div>
            <div className="container">
                <div className="col-12 col-sm-12 col-md-12 top-margin-lg">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4  top-margin-sm">
                            <div className="card z-index bg-dark">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success">20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4  top-margin-sm">
                            <div className="card z-index bg-dark">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success">20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4  top-margin-sm">
                            <div className="card z-index bg-dark">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success">20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4  top-margin-sm">
                            <div className="card z-index bg-dark text-white">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success">20 mins ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog