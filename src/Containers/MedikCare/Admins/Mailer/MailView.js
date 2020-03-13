import React, {useState, useEffect, createContext} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import CKEditor from 'ckeditor4-react';




const AdminUpdateMail = ()=>{
const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
const maillerId = props.match.params.id;

const [display, setDisplay] = useState({display:"display-none"});
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"});
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"});


const [mailTopic, setMailTopic] = useState({value:""});
const [mailArticle, setMailArticle] = useState({value:""});
const [maillerItem, setMaillerItem] = useState({});



const  previewBlog =()=>{
    const url = "/api/v1/mailler/"+maillerId;
    fetch(url,{
        method:"GET",
        headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
    })
    .then(res=>res.json())
    .then(response=>{
        if (response.status === 200) {
         setMaillerItem(response.message);
         setMailTopic({value:response.message.topic});
         setMailArticle({value:response.message.article});
         
        }
    })
}


const validateMailMessage = (event) =>{
    setMailArticle({value:event.editor.getData()});
}

const validateMailTopic = (event)=>{
    setMailTopic({value:event.target.value});
}
const validateUsersMail = (event)=>{
    setUsersMail({value:event.target.value, display:""});
}
const submitBlog = (event)=>{
    event.preventDefault();
    const mailler = {topic:mailTopic.value, article:mailArticle.value};
   const url = "/api/v1/mailler/update/";
    fetch(url, {
        method:"POST",
        body:JSON.stringify(mailler),
        headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
    })
    .then(res=>res.json())
    .then(response=>{
        if (response.status === 201) {
            console.log(response)
            window.location ="/admin/mail/"+response.message._id;
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
                                           <div className="col-5 col-sm-5 col-md-5">
                                          
                                            <div>
                                            <h3>Note!</h3>
                                        </div>
                                           </div>
                                            <div className="col-7 col-sm-7 col-md-7">
                                                <h1>{maillerItem.topic}</h1>
                                                <div className="blog-image" dangerouslySetInnerHTML={{ __html: maillerItem.message }} />
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                </div>
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
                                                <input type="text" value={maillerItem.topic} onChange={event=>validateMailTopic(event)} className="form-control" required />
                                                <span></span>
                                            </div>
                                        </div>
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group text-dark">  
                                                    <p onClick={event=>toggleDisplayTrue(event,true)} className="btn btn-sm btn-medik">Images</p>
                                                    <CKEditor
                                                        data={maillerItem.message}
                                                        onInit={ editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                            console.log( 'Editor is ready to use!', editor );
                                                        } }
                                                        onChange={event => validateMailMessage(event)}
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


export default AdminUpdateMail;