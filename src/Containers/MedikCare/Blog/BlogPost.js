import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import NavBar from '../MedikWeb/NavBar/NavBar';
import Footer from '../MedikWeb/Footer';
import SideBar from '../MedikWeb/NavBar/SideBar';


const BlogPost = (props)=>{
    const _id  = props.match.params.id

    const [blog, setBlog]=useState({});
    const [blogs, setBlogs]=useState([]);
    const [iframe, setIframeDIsplay] = useState({display:""})

   const fetchOneBlogHandler = ()=>{
       const url = "/api/v1/blogs/users/"+_id;
        fetch(url,{
            method:"POST",
            headers: {'Content-Type': "application/json"},

        })
        .then(res=>res.json())
        .then(response=>{
                 
        if(!response.message.image){
            response.message.blogImage = "user.png"
        }else{
            response.message.blogImage = response.message.image.filename;
        }
            if(response.message.videoLink) {
                setIframeDIsplay({display:""});
            }else{
                setIframeDIsplay({display:"display-none"});
            }
            setBlog(response.message);
        })
    }

    const fetchBlogHandler = ()=>{
        const url = "/api/v1/blogs/users";
         fetch(url,{
             method:"POST",
             headers: {'Content-Type': "application/json"},
 
         })
         .then(res=>res.json())
         .then(response=>{
            const b = response.message.slice(0,5)
             setBlogs(b);
         })
     }
     const goTOBlog=(event, id)=>{
         event.preventDefault();
         window.location = "/blog/"+id
     }
 
     useEffect(()=>{
        fetchOneBlogHandler();
        fetchBlogHandler()
    }, [])
 
     const allBlog =  blogs.map((blog)=>{
         
         if(!blog.image){
             blog.blogImage = "user.png"
         }else{
             blog.blogImage = blog.image.filename;
         }
        return  <div className="col-12 col-sm-12 col-md-12  bottom-margin-sm" key={blog._id}>
            <Link to={`/blog/${blog._id}`}>
             <div onClick={event=>goTOBlog(event, blog._id)} className="card  bg-dark">
                 <img src={`/Images/${blog.blogImage}`} height="255px" className="blog-position card opacity-5 bg-dark" />
                 <button className="btn btn-medik btn-lg blog-button-position">Read</button>
                 <div className="card-body blog-position-text text-white">
                 <h1>{blog.topic}</h1>
                 <span><i className="card-text fa fa-user"></i> {blog._createdBy}</span>
                 <span className="float-right text-success"><i className="fa fa-clock" ariahidden="true"></i> <Moment fromNow>{blog.dateCreated}</Moment> </span>
                 </div>
             </div>
             </Link>
         </div>
 
     })
    return (
        <div>
             <NavBar />
             <SideBar />
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
                        <div className="col-12 col-sm-12 col-md-7 col-lg-8 bottom-margin-lg">
                            <div className="card-body home-content medik-color">
                            <h1>{blog.topic}</h1>
                            </div>
                            <div className="card">
                            <img src={`/Images/${blog.blogImage}`} className="img-thumbnail card" />
                            <div className="card-body bg-dark text-white">
                            <span><i className="card-text fa fa-user"></i> {blog._createdBy}</span>
                            <span className="float-right"><i className="fa fa-clock" ariahidden="true"></i> 20 mins ago</span>
                                 
                            </div>
                             <div className="card-body">  
                                   <div className="blog-image" dangerouslySetInnerHTML={{ __html: blog.article }} /> 
                                   <iframe className={` ${iframe.display} iframe-height`} width="100%"  src={`https://www.youtube.com/embed/${blog.videoLink}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>          
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12 col-sm-12 col-md-5 col-lg-4 top-margin-lg float-right">
                            <h5>Recent Blog Post</h5>
                            <div className="card row bottom-padding-sm bottom-margin-sm"> 
                            {allBlog}        
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