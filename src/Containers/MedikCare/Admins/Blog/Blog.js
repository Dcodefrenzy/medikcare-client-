import React, {useState, useEffect} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const AdminBlog = ()=>{
    const [admins, setAdmins] =useState([]);
    const [display, setDisplay] = useState({display:"display-none"});
    const [blogItem, setBlogItem] = useState([]);
    const [videoLink, setIframeDIsplay] = useState({display:""})
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));

    const  fetchBlogArticles =()=>{
        const url = "/api/v1/blogs/";
        fetch(url,{
            method:"GET",
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 200) {
                
            if(response.message.videoLink) {
                setIframeDIsplay({display:""});
            }else{
                setIframeDIsplay({display:"display-none"});
            }
                setBlogItem(response.message);
            }
        });
    }

   const fetchAdmins = () =>{
       const url = "/api/v1/admins//blog";
        fetch(url, {
            method:"GET",
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 200) {
                
                setAdmins(response.admins);
            }
        });
    }

    const updateBlogPublish = (event, deleteArticle, blogId)=>{
        event.preventDefault();
        const url = "/api/v1/blogs/publish/"+blogId;
        fetch(url, {
            method:"PATCH",
            body:JSON.stringify({deleteArticle:deleteArticle}),
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 201) {
               
                location.reload();
            }else{
                console.log(response);
            }
        })
    }

    const notifyUsers =(event,id)=>{
        event.preventDefault();
        setDisplay({display:"display-block"})
            const url = "/api/v1/blogs/notify-users/"+id;
            fetch(url, {
                method:"POST",
                headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
            })
            .then(res=>res.json())
            .then(response=>{
                if (response.status === 200) {
                    setDisplay({display:"display-none"})
                   alert("Blog mail sent.");
                }else{
                   console.log("response");
                }
            })
    }
    useEffect(()=>{
        fetchBlogArticles();
        fetchAdmins();
    }, [])


    const allBlogs = blogItem.map((blog)=>{
        let img;
        if (blog.image === undefined) {
            img = <img  width="100%" src={"/Images/user.png"} alt="admin-profile"/>
        }else{
            img = <img   width="100%" src={"/Images/"+blog.image.filename} alt="admin-profile"/>
        }
        if (blog.category === 1) {
            blog.category = "MedikByte"
           }else if (blog.category === 2) {
            blog.category = "Others"
           }
           if (blog.deleteArticle === false) {
            blog.deleteArticleStatus = "Unpublish";
            blog.deleteArticleColor = "text-success";
            blog.deleteArticleStatusOpposite = "Published";
           }else if (blog.deleteArticle === true) {
            blog.deleteArticleStatus = "Publish";
            blog.deleteArticleColor = "text-danger";
            blog.deleteArticleStatusOpposite = "UnPublished"
           }

        return <div className="col-12 col-sm-6 col-md-4 top-margin-sm" key={blog._id}>
                <div className="card">
                    <Link to={`/admin/blog/${blog._id}`}>
                {img}
                <div className="card-body">
                <p className="float-right text-dark">Category- <b className="text-primary">{blog.category}</b></p>
                <p className="text-dark">{blog.topic}</p>
                
                <button className="btn btn-sm btn-medik float-right" onClick={(event)=>updateBlogPublish(event, !blog.deleteArticle,blog._id)}>{blog.deleteArticleStatus}</button>
                <p className={blog.deleteArticleColor}>{blog.deleteArticleStatusOpposite}</p>
                <p className="float-right text-dark">Date <br/><Moment fromNow>{blog.dateCreated}</Moment></p>
                <button className="btn btn-sm btn-success" onClick={(event=> notifyUsers(event, blog._id))}>Notify Users</button>
                </div>
                </Link>
                </div>
        </div>
                                                  
    })
    return  (
        <div>
        <Loading display={display.display}/> 
            <NavBar />
            <SideBar />
            <div className="top-margin-lg ">  
                <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                           <Link to="/admin/blog/add"> <button className="btn btn-sm btn-medik">Add Blog</button></Link>
                            <div className="card">
                                <div className="card-header b-medik text-white">
                                    <h3>Blog Preview</h3>
                                </div>
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="row">
                                                {allBlogs}
                                        </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminBlog;