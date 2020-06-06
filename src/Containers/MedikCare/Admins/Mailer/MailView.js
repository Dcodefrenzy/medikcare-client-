import React, {useState, useEffect, createContext} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import CKEditor from 'ckeditor4-react';
import { Link } from 'react-router-dom';
import AdminMailUsers from "./MailUsers";




const AdminUpdateMail = (props)=>{
const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
const maillerId = props.match.params.id;


const [file, setFile]  = useState({file:""});
const [images, setImages] =useState([]);

const [display, setDisplay] = useState({display:"display-none"});
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"});
const   [maillerAlert, setMaillerAlert]= useState({display:"display-none"});
const [maillerDisplay, setMaillerDisplay] = useState({display:"display-none"})


const [mailTopic, setMailTopic] = useState({value:""});
const [mailArticle, setMailArticle] = useState({value:""});
const [maillerItem, setMaillerItem] = useState({});



const handleMaillerDisplay = (event, display)=>{
    event.preventDefault();
    setMaillerDisplay({display:display});
}
const  previewMailler =()=>{
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
         setMailArticle({value:response.message.message});
         
        }
    })
}


const validateMailMessage = (event) =>{
    setMailArticle({value:event.editor.getData()});
}

const validateMailTopic = (event)=>{
    setMailTopic({value:event.target.value});
}

const updateMailler = (event)=>{
    event.preventDefault();
    const mailler = {topic:mailTopic.value, message:mailArticle.value};
   const url = "/api/v1/mailler/update/"+maillerId;
    fetch(url, {
        method:"POST",
        body:JSON.stringify(mailler),
        headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
    })
    .then(res=>res.json())
    .then(response=>{
        if (response.status === 201) {
            console.log(response)
            window.location ="/admin/mail/";
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

useEffect(()=>{
    previewMailler();
}, [])


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
                                    <h1> Images</h1>
                                    <span>please upload an image.</span> 
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

          
            <AdminMailUsers click={event=>handleMaillerDisplay(event, "display-none")}  id={maillerId} display={maillerDisplay.display}/>
            <NavBar />
            <SideBar />
            <div> 
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-8">
                            <div className="card top-margin-sm">
                            <div className="card-header b-medik text-white">
                                    <h3>Mail Preview</h3>
                                </div>
                                <div className="card-body">
                                    <Link to="/admin/mail">
                                    <button className="btn btn-sm btn-medik">Back to mails</button>
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
                                                <button onClick={event=>handleMaillerDisplay(event, "")} className="btn btn-sm btn-success">Send Mail</button>
                                                <div className="blog-image" dangerouslySetInnerHTML={{ __html: maillerItem.message }} />
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h3>Add Mail</h3>
                                    <form onSubmit={updateMailler}>
                                    <div className="row"> 
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className={"alert alert-success "}>
                                                <p>Update successful</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Topic">Topic</label>
                                                <input type="text" value={mailTopic.value} onChange={event=>validateMailTopic(event)} className="form-control" required />
                                                <span></span>
                                            </div>
                                        </div>
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group text-dark">  
                                                    <p onClick={event=>toggleDisplayTrue(event,true)} className="btn btn-sm btn-medik">Images</p>
                                                    <CKEditor
                                                        data={mailArticle.value}
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