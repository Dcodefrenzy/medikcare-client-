import React, {useState, useEffect, createContext} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import CKEditor from 'ckeditor4-react';


const AdminBlogView = (props)=>{
    const blogId  = props.match.params.id
 
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));

    const [file, setFile]  = useState({file:""});
    const [blogFile, setblogFile]  = useState({file:""});
    const [images, setImages] =useState([]);
    const [blogItem, setBlogItem] = useState({});
    
    const [display, setDisplay] = useState({display:"display-none"})
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"})
    
    
    const [blogTopic, setBlogTopic] = useState({value:""})
    const [blogCategory, setBlogCategory] = useState({value:""})
    const [blogArticle, setBlogArticle] = useState({value:""});
    
    
    const validateBlogMessage = (event) =>{
        setBlogArticle({value:event.editor.getData()})
    }
    
    const validateBlogTopic = (event)=>{
        setBlogTopic({value:event.target.value})
    }
    const validateBlogCategory = (event)=>{
        setBlogCategory({value:event.target.value})
    }

   const  previewBlog =()=>{
       const url = "/api/v1/blogs/"+blogId
       fetch(url,{
           method:"GET",
           headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
       })
       .then(res=>res.json())
       .then(response=>{
           if (response.status === 200) {
               if (response.message.category === 1) {
                response.message.category = "MedikByte"
               }else{
                response.message.category = "Others"
               }
               if (response.message.deleteArticle === false) {
                    response.message.deleteArticleStatus = "Unpublish";
               }else if (response.message.deleteArticle === true) {
                response.message.deleteArticleStatus = "Publish";
                   
               }
            setBlogItem(response.message);
            setBlogTopic({value:response.message.topic});
            setBlogArticle({value:response.message.article});
            
            if (response.message.image) {
                setblogFile(response.message.image);
            }else{
                setblogFile({filename:"user.png"});
            }
           }
       })
   }
const updateBlogPublish = (event, deleteArticle)=>{
    console.log(deleteArticle);
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
            console.log(response)
            setAlert({alertDisplay:"", spinnerDisplay:"display-none"})
            location.reload();
        }else{
            console.log(response)
        }
    })
}

    const submitBlog = (event)=>{
        event.preventDefault();
        const blog = {topic:blogTopic.value, category:blogCategory.value, article:blogArticle.value}
       const url = "/api/v1/blogs/update/"+blogId;
        fetch(url, {
            method:"PATCH",
            body:JSON.stringify(blog),
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 201) {
                console.log(response)
                setAlert({alertDisplay:"", spinnerDisplay:"display-none"})
                location.reload();
            }else{
                console.log(response)
            }
        })
    }
    
    const toggleDisplay =(event,result)=>{
        setDisplay({"display": "display-none"})
    
    }
    const toggleDisplayTrue=(event,result)=>{
     
            setDisplay({"display": ""})
        const url = "/api/v1/images/"
        fetch(url, {
            method:"GET",
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response)
            
        setImages(response.message)
        })
    }
    const fileHandler=(event)=>{
        setFile({file:event.target.files[0]})
    
    }
    const addImage = (event)=>{
        event.preventDefault();
        
        const formData = new FormData()
            
        formData.append('image', file.file);
        console.log(formData)
        const url = "/api/v1/images/post";
        fetch(url,{
            method:"POST",
            body:formData,
            headers:{"x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
        setFile({file:""});
        setImages(response.message)
    
        });
    }
    const addBlogImage = (event)=>{
        event.preventDefault();
        
        const formData = new FormData()
            
        formData.append('image', file.file);
        
        const url = "/api/v1/blogs/update-image/"+blogId;
        fetch(url,{
            method:"PATCH",
            body:formData,
            headers:{"x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            location.reload();
        });
    }
const allImages = images.map((image)=>{
    return <img key={image._id} className="img-thumbnail" width="25%" src={"/Images/"+image.filename} alt="admin-profile-image"/>
                                              
})
 
useEffect(()=>{
    previewBlog();
}, [])


    return  (
        <div>
              <div className={`col-12 col-sm-12 col-md-6 offset-md-3 ${display.display}`}>
                <div className="card bg-dark opacity-7 fixed">
                </div>
            </div>  

                    <div className={`col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed top-margin-lg ${display.display}`}>
                    <main className="card opacity">
                            <div className="card-header  home-content"> 
                            <i onClick={event=>toggleDisplay(event,false)} className="float-right fa fa-times" arialhidden="true"></i>  
                                    <h1>Blog Images</h1>
                                    <span>please upload a blog image.</span> 
                            </div>
                            <form onSubmit={addImage}>          
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className={"alert alert-success "}>
                                        <p>Update successful</p>
                                    </div>
                                    <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input onChange={fileHandler} type="file" className="form-control" />
                                        </div>
                                </div>
                                    <div className="row">
                                            <div className="col-6 col-sm-6 col-md-6">
                                                <div className={alert.spinnerDisplay}>
                                                    <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                                </div>
                                                <div className="form-group">
                                                    <input className="btn-medik form-control" type="submit" name="update" value="Update"/>
                                                </div>
                                            </div>
                                    </div>    
                            </form>
                            <div className="overflow-content">
                                {allImages}
                            </div>
                        </main>
                    
                    </div>
            <NavBar />
            <SideBar /> 
            <div className="top-margin-lg ">  
                <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                            <div className="card">
                                <div className="card-header b-medik text-white">
                                    <h3>Blog Preview</h3>
                                </div>
                                <div className="card-body">
                                    <Link to="/admin/blog">
                                    <button className="btn btn-sm btn-medik">Back to blog</button>
                                    </Link>
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="row">
                                           <div className="col-12 col-sm-5 col-md-5">
                                           <img className="img-thumbnail" width="100%"src={"/Images/"+blogFile.filename}  alt="blog image"/>
                                           <form onSubmit={addBlogImage}>          
                                                <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="image">Image</label>
                                                    <input onChange={fileHandler} type="file" className="form-control" />
                                                </div>
                                            </div>
                                        <div className="row">
                                            <div className="col-6 col-sm-6 col-md-6">
                                                <div className={alert.spinnerDisplay}>
                                                    <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                                </div>
                                                <div className="form-group">
                                                    <input className="btn-medik form-control" type="submit" name="update" value="Update"/>
                                                </div>
                                            </div>
                                        </div>    
                                        </form>
                                        <div>
                                            <h3>Note!</h3>
                                            <p>After adding an article, it wont display on the client side until you are done with editing. For the article to be displayed for the users, you need to click on the Publish button below and ifafter publishing you want to unpublish click on the unbublish button.</p>
                                            <button className="btn btn-sm btn-medik" onClick={(event)=>updateBlogPublish(event, !blogItem.deleteArticle)}>{blogItem.deleteArticleStatus}</button>
                                        </div>
                                           </div>
                                            <div className="col-12 col-sm-7 col-md-7">
                                                <h1>{blogItem.topic}</h1>
                                                <div className="blog-image" dangerouslySetInnerHTML={{ __html: blogItem.article }} />
                                                <iframe  width="100%" className="iframe-height" src={`https://youtube.com/embed/${blogItem.videoLink}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                                <div className="card-body">
                                   <div className="row">
                                       <h1>Update Blog</h1>
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="">
                                        <form onSubmit={submitBlog}>
                                    <div className="row"> 
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className={`alert alert-success ${alert.alertDisplay}`}>
                                                <p>Update successful</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Topic">Topic</label>
                                                <input type="text" value={blogTopic.value} onChange={event=>validateBlogTopic(event)} className="form-control" />
                                                <span></span>
                                            </div>
                                        </div>
                                                                                     
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="category">Category</label>
                                                <select onChange={event=>validateBlogCategory(event)} name="category" className="form-control" required>
                                                    <option value="">select category</option>
                                                    <option value="1">MedikByte</option>
                                                    <option value="2">Other</option>
                                                </select>
                                                <span>Old category: <b>{blogItem.category}</b></span>
                                            </div>
                                        </div>
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group text-dark">  
                                                    <p onClick={event=>toggleDisplayTrue(event,true)} className="btn btn-sm btn-medik">Images</p>
                                                    <CKEditor
                                                        data={blogArticle.value}
                                                        onInit={ editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                            console.log( 'Editor is ready to use!', editor );
                                                        } }
                                                        onChange={event => validateBlogMessage(event)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className={alert.spinnerDisplay}>
                                                <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                            </div>
                                            <div className="form-group">
                                                <input className="btn-medik form-control" type="submit" name="update" value="Post"/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                     </form>
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


export default AdminBlogView;