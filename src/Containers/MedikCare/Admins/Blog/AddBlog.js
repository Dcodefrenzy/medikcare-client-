import React, {useState, useEffect, createContext} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import CKEditor from 'ckeditor4-react';




const AdminAddBlog = ()=>{
const sessionItem = JSON.parse(sessionStorage.getItem("admin"));

const [file, setFile]  = useState({file:""});
const [images, setImages] =useState([]);

const [display, setDisplay] = useState({display:"display-none"})
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"})


const [blogTopic, setBlogTopic] = useState({value:""})
const [blogCategory, setBlogCategory] = useState({value:""})
const [blogArticle, setBlogArticle] = useState({value:""});
const [videoLink,setVideoLink] = useState({value:""});




const validateBlogMessage = (event) =>{
    setBlogArticle({value:event.editor.getData()});
}

const validateBlogTopic = (event)=>{
    setBlogTopic({value:event.target.value});
}
const validateBlogCategory = (event)=>{
    setBlogCategory({value:event.target.value});
}
const validateVideoLink = (event) =>{
    setVideoLink({value:event.target.value});
}
const submitBlog = (event)=>{
    event.preventDefault();
    const blog = {topic:blogTopic.value, category:blogCategory.value, article:blogArticle.value, videoLink:videoLink.value};
   const url = "/api/v1/blogs/add/";
    fetch(url, {
        method:"POST",
        body:JSON.stringify(blog),
        headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
    })
    .then(res=>res.json())
    .then(response=>{
        if (response.status === 201) {
            console.log(response)
            window.location ="/admin/blog/"+response.blogId;
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

const allImages = images.map((image)=>{
    return <img key={image._id} className="img-thumbnail" width="25%" src={"/Images/"+image.filename} alt="admin-profile-image"/>
                                              
})

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
            <div>  
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-8">
                            <div className="card top-margin-sm">
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h3>Add Blog</h3>
                                    <form onSubmit={submitBlog}>
                                    <div className="row"> 
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className={"alert alert-success "}>
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
                                                    <option value="2">MedikByte Video</option>
                                                    <option value="3">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                    <label htmlFor="Video">Video Link</label>
                                                    <input type="text" value={videoLink.value} onChange={event=>validateVideoLink(event)} className="form-control" />
                                                    <span></span>
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
    )
}


export default AdminAddBlog;