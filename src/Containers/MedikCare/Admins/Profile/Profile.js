import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import NavBar from "../Navbar/NavBar";
import SideBar from "../Navbar/SideBar";
import AdminDashboard from "../AdminDashboard";
import Loading from "../../Loading/Loading";

const adminProfile = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [display, setDisplay] = useState({display:"display-block"});
    const [admin, setAdmin] = useState({});
    const [file, setFile]  = useState({})
    const [logsDetails, setlogsDetails] = useState([]);
    const [logs, setLogs] = useState({start:0, end:5})
    const [firstName, setfirstName] = useState({id:"firstname", value:"", type:"text"})
    const [firstNameError, setfirstNameError] = useState({id:"firstNameError", display:"display-none", value:""})
    const [lastName, setlastName] = useState({id:"oldPasswordError", value:"", type:"text"})
    const [lastNameError, setlastNameError] = useState({id:"lastNameError", display:"display-none", value:""})
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"})
    const firstNameHandler =(event)=>{
        setfirstName({id:"firstName", value:event.target.value, type:"text"})
    }
    const lastNameHandler =()=>{

        setlastName({id:"lastName", value:event.target.value, type:"text"})
    }

    const setUserDisplayHadler=()=>{
        const url = "/api/v1/admins/profile";
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
                window.location = "/admin/login?Session expired please login."
            }else if (response.status === 200) {
                setDisplay({display:"display-none"});
                setAdmin(response.message);
                if (response.message.image) {
                    setFile(response.message.image);
                }else{
                    setFile({filename:"user.png"});
                }
            }
        })
    }
    const setAdminProfile=(event)=>{
        event.preventDefault();
        setAlert({alertDisplay:"display-none", spinnerDisplay:"block"})
        const first = firstName.value === ""?admin.firstname:firstName.value; 
        const last  = lastName.value === ""?admin.lastname:lastName.value;
       let adminData ={};
       adminData = {"firstname": first,"lastname": last};
        const url = "/api/v1/admins/profile/update";
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(adminData),
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
                window.location = "/admin/login?Session expired please login."
            }else if (response.status === 201) {
                 setAlert({alertDisplay:"block", spinnerDisplay:"display-none"})
            }
        })
    }

    const setAdminLogs=(event)=>{
        const url = "/api/v1/logs/admin"
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
                window.location = "/admin/login?Session expired please login."
            }else if (response.status === 200) {
                setlogsDetails(response.message);
            }
        })
    }

    const setlogsHandler = (event) =>{
        event.preventDefault()
        setLogs({start:0, end:logs.end+5})
    }

    useEffect(()=>{
        setUserDisplayHadler();
    }, [])
    useEffect(()=>{
        setAdminLogs();
    }, [])
    return (
        <div>  
            <Loading display={display.display}/> 
            <NavBar />  
            <SideBar /> 
            <section>  
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-8">
                            <div className="card">
                                <div className="card-header b-medik text-white">
                                    <h3>Profile</h3>
                                </div>
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="row">
                                           <div className="col-5 col-sm-5 col-md-5">
                                           <img className="img-thumbnail" width="100%" src={"/Images/"+file.filename} alt="admin-profile-image"/>
                                           <Link to="admin/image/update">
                                                <small className="display-block">Click here to add a profile picture</small>
                                           </Link>
                                           </div>
                                            <div className="col-7 col-sm-7 col-md-7">
                                                <p><b>{admin.firstname +" "+ admin.lastname}</b></p>
                                                <p><b>Email:</b> {admin.email}</p>
                                                <p><b>Phone Numer:</b> +234{admin.phoneNumber}</p>
                                                <p><b>last login: </b></p><Moment fromNow>{admin.lastLogin}</Moment>
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
                                            <h3>Activities</h3>
                                                {logsDetails.reverse().slice(logs.start, logs.end).map((log, index)=>{
                                              return  <div className="row" key={log._id}>
                                                    <div className="col-8 col-sm-8 col-md-8">
                                                        <p>{log.title}</p>
                                                    </div>
                                                    <div className="col-4 col-sm-4 col-md-4">
                                                    <Moment fromNow>{log.date}</Moment> <i className="fa fa-clock-o"></i>
                                                    </div>
                                                </div>
                                                })}
                                                <button onClick={(event)=>setlogsHandler(event)} className="btn btn-sm btn-medik">More</button>
                                        </div>
                                   </div>
                                </div>
                            </div>
                            <div className="card top-margin-sm">
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h3>Update Profile</h3>
                                    <form onSubmit={setAdminProfile}>
                                    <div className="row"> 
                                        <div className="col-12 col-sm-12 col-md-8">
                                            <div className={"alert alert-success "+ alert.alertDisplay}>
                                                <p>Update successful</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input id={firstName.id} onChange={(event) => firstNameHandler(event,firstName.id)} type={firstName.type} className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder={admin.firstname} value={firstName.value}  />
                                                <span id={firstNameError.id} className={firstNameError.display}>{firstNameError.value}</span>
                                            </div>
                                                </div>
                                            <div className="col-12 col-sm-12 col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input id={lastName.id} onChange={(event) => lastNameHandler(event, lastName.id)} type={lastName.type} className="form-control" min="3" aria-describedby="lastname" name="lastname" placeholder={admin.lastname} value={lastName.value}  />
                                                    <span id={lastNameError.id} className={lastNameError.display}>{lastNameError.value}</span>
                                                </div>
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

export default adminProfile;