import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import NavBar from '../MedikWeb/NavBar/NavBar';
import Footer from '../MedikWeb/Footer';


const BlogPost = ()=>{

    return (
        <div>
             <NavBar />
            <div className="container">
                <div className="col-12 col-sm-12 col-md-12 top-margin-lg">
            <div className="row">
                <div className="col-12 col-sm-10 col-md-10 col-lg-10 top-margin-sm">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb b-medik ">
                            <li  className="breadcrumb-item" aria-current="page"><Link  className="text-white" to="/index">Home</Link></li>
                            <li  className="breadcrumb-item" aria-current="page"><Link  className="text-white" to="/blog">Blogs</Link></li>
                        </ol>
                    </nav>
                </div>
            </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-7 col-lg-8">
                            <div className="card-body home-content medik-color">
                                <h1>Health Care In Nigeria</h1>
                            </div>
                            <div className="card">
                                
                            <img src="/Images/user.png" className="img-thumbnail card" />
                                <div className="card-body">  
                                    <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                    <span className="float-right text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12 col-sm-12 col-md-5 col-lg-4 top-margin-lg float-right">
                            <h5>Recent Blog Post</h5>
                            <div className="card row">        
                                <div className="col-12 col-sm-12 col-md-12  bottom-margin-sm">
                                    <div className="card  bg-dark text-white">
                                        <img src="/Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                        <div className="card-body blog-position-text text-white">
                                            <h1>Health Care In Nigeria</h1>
                                            <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                            <span className="display-block text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                        </div>
                                    </div>
                                </div>        
                                <div className="col-12 col-sm-12 col-md-12  bottom-margin-sm">
                                    <div className="card  bg-dark text-white">
                                        <img src="/Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                        <div className="card-body blog-position-text text-white">
                                            <h1>Health Care In Nigeria</h1>
                                            <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                            <span className="display-block text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                        </div>
                                    </div>
                                </div>        
                                <div className="col-12 col-sm-12 col-md-12  bottom-margin-sm">
                                    <div className="card  bg-dark text-white">
                                        <img src="/Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                        <div className="card-body blog-position-text text-white">
                                            <h1>Health Care In Nigeria</h1>
                                            <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                            <span className="display-block text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                        </div>
                                    </div>
                                </div>       
                                <div className="col-12 col-sm-12 col-md-12  bottom-margin-sm">
                                    <div className="card bg-dark text-white">
                                        <img src="/Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                        <div className="card-body blog-position-text text-white">
                                            <h1>Health Care In Nigeria</h1>
                                            <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                            <span className="display-block text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                        </div>
                                    </div>
                                </div>       
                                <div className="col-12 col-sm-12 col-md-12  bottom-margin-sm">
                                    <div className="card  bg-dark text-white">
                                        <img src="/Images/user.png" className="blog-position img-thumbnail card opacity-5 bg-dark" />
                                        <div className="card-body blog-position-text text-white">
                                            <h1>Health Care In Nigeria</h1>
                                            <span><i className="card-text fa fa-user"></i> Kolade Fakunle</span>
                                            <span className="display-block text-success"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                        </div>
                                    </div>
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

export default BlogPost