import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Loading from "../../Loading/Loading";


const updateUserImage = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    if (sessionItem === null) {
        window.location = "/login"
    }
    const [display, setDisplay] = useState({display:"display-block"});
    const [admin, setAdmin] = useState({});
    const [file, setFile]  = useState({file:""});
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"})


    const setUserDisplayHadler=()=>{
        const url = "http://192.168.33.12:3000/api/v1/user/profile";
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
            }else if (response.status === 200) {
                setDisplay({display:"display-none"});
                
                if (response.message.image) {
                    setAdmin(response.message.image);
                }else{
                    setAdmin({filename:"user.png"});
                }
            }
        })
    }
    const fileHandler=(event)=>{
        setFile({file:event.target.files[0]})
  
    }

    const setAdminProfile=(event)=>{console.log(file)
        event.preventDefault();
        const formData = new FormData()
        
        formData.append('image', file.file)
        const url = "http://192.168.33.12:3000/api/v1/user/image/update";
        fetch(url, {
            method: "POST",
            body:formData,
            headers: {"u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response.message)
            if(response.status === 401) {
                sessionStorage.removeItem("doctor");
                window.location = "/login?Session expired please login."
            }else if (response.status === 201) {
                window.location.reload(true);

            }
        })


    }

    useEffect(()=>{
        setUserDisplayHadler();
    }, [])
   
    return (
        <div>  
            <Loading display={display.display}/> 
        <section>
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-7">
                            <Link to="/user/Profile">
                                <button className="btn btn-sm btn-medik">Go Back</button>
                            </Link>
                        <div className="card">
                                <div className="card-header b-medik text-white">
                                    <h3>Image</h3>
                                </div>
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="row justify-content-center">
                                           <div className="col-12 col-sm-12 col-md-12"> 
                                               <div className="text-center">
                                               <img className="img-thumbnail" width="50%" src={"/Images/"+admin.filename} alt="admin-profile-image"/>
                                               </div>
                                           </div>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div className="card top-margin-sm">
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h3>Update Image</h3>
                                    <form encType="multipart/form-data" onSubmit={setAdminProfile}>
                                        <div className="row alert alert-success padding-sm">
                                            <div className="col-12 col-sm-12 col-md-12">
                                            <input type="file" name="image" onChange={fileHandler} />
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
                                    </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    </div>
    )
}

export default updateUserImage;