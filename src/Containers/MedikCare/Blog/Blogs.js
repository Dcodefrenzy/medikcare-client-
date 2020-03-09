import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import Footer from '../MedikWeb/Footer';
import NavBar from '../MedikWeb/NavBar/NavBar';


const Blog = (props)=>{

    return (
        <div>
            <NavBar />
            <div className="container user-section">
                <div className="col-12 col-sm-12 col-md-12 top-margin-lg">
            <div className="row top-margin-lg">
                <div className="col-12 col-sm-10 col-md-10 col-lg-10">
                    <h1 className="medik-color">Blog Post</h1>
                </div>
            </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 bottom-margin-sm">
                            <div className="card  bg-dark">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 bottom-margin-sm">
                            <div className="card  bg-dark">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 bottom-margin-sm">
                            <div className="card bg-dark">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4  bottom-margin-sm">
                            <div className="card bg-dark text-white">
                                <img src="Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                <div className="card-body blog-position-text text-white">
                                <h1>Health Care In Nigeria</h1>
                                <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                <span className="float-right text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Blog