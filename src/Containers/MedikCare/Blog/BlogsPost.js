import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import Footer from '../MedikWeb/Footer';
import NavBar from '../MedikWeb/NavBar/NavBar';
import SideBar from '../MedikWeb/NavBar/SideBar';



const BlogsPost = (props)=>{
    
    const _id  = props.match.params.id
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [blog, setBlog]=useState([]);

    
   const fetchBlogHandler = ()=>{
       let byte
       if (_id === "medikbyte") {
        byte = 1;
       }else if (_id === "medikbyte-video") {
           byte = 2;
       }else{
           byte = 3;
       }
    const url = "/api/v1/blogs/users/category/"+byte;
     fetch(url,{
         method:"POST",
         headers: {'Content-Type': "application/json"},

     })
     .then(res=>res.json())
     .then(response=>{
         console.log(response);
         setBlog(response.message);
     })
 }

 
 useEffect(()=>{
    fetchBlogHandler();
}, [])

let arrowBack;
if (sessionItemUser !== null && sessionItemDoctor === null) {
    arrowBack = <Link to="/user/dashboard"> <span   className="fa fa-arrow-left medik-color mt-2" aria-hidden="false"></span></Link>
}else if (sessionItemUser === null && sessionItemDoctor !== null) {
    arrowBack = <Link to="/doctor/dashboard"> <span   className="fa fa-arrow-left medik-color mt-2" aria-hidden="false"></span></Link>
}else{
    arrowBack = "";
}

const allBlog =  blog.map((blog)=>{
        
    if(!blog.image){
        blog.blogImage = "user.png"
    }else{
        blog.blogImage = blog.image.filename;
    }
    
   return  <div className="col-12 col-sm-12 col-md-6 col-lg-4 bottom-margin-sm" key={blog._id}>
       <Link to={`/blog/${blog._id}`}>
        <div className="card  bg-dark">
            <img src={`/Images/${blog.blogImage}`} height="255px" className="blog-position card opacity-5 bg-dark" />
            <button className="btn btn-medik btn-lg blog-button-position">Read</button>
            <div className="card-body blog-position-text text-white">
            <h1>{blog.topic}</h1>
            <span><i className="card-text fa fa-user"></i> {blog._createdBy}</span>
            <span className="float-right text-white">  <i className="fa fa-clock" ariahidden="true"></i> <Moment fromNow>{blog.dateCreated}</Moment> </span>
            </div>
        </div>
        </Link>
    </div>

})


    return (
        <div>
            <NavBar />
            <SideBar />
            <div className="container mt-5">
                
                <div className="col-12 col-sm-12 col-md-12 top-margin-lg">
            <div className="row top-margin-lg">
                <div className="col-12 col-sm-10 col-md-10 col-lg-10">
                    {arrowBack}
                    <h1 className="medik-color">Blog Post</h1>
                </div>
            </div>
                    <div className="row">
                        {allBlog}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default BlogsPost;