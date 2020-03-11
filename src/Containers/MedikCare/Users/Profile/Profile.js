import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import Loading from "../../Loading/Loading";
import NavbarHeader from "../NavBar/NavBar";
import NavbarFooter from "../NavBar/NavbarFooter";

const userProfile = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    if (sessionItem === null) {
        window.location = "/login"
    }
    const [display, setDisplay] = useState({display:"display-block"});
    const [user, setUser] = useState({});
    const [file, setFile]  = useState({})
    const [PersonalRecord, setPersonalRecord]  = useState({})
    const [logsDetails, setlogsDetails] = useState([]);
    const [logs, setLogs] = useState({start:0, end:5})
    const [firstName, setfirstName] = useState({id:"firstname", value:"", type:"text"})
    const [lastName, setlastName] = useState({id:"lastname", value:"", type:"text"})
    
    const [age, setAge] = useState({id:"age", value:""})
    const [address, setAddress] = useState({id:"adress", value:"", type:"text"})    
    const [kinName, setKinName] = useState({id:"kinName", value:"", type:"text"})    
    const [status, setStatus] = useState({id:"status", value:"",})    
    const [kinNumber, setkinNumber] = useState({id:"kinNumber", value:"", type:"number"})
    const [gender, setGender] = useState({id:"gender",value:""})

    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"})
    const firstNameHandler =(event)=>{
        setfirstName({id:"firstName", value:event.target.value, type:"text"})
    }
    const lastNameHandler =(event)=>{

        setlastName({id:"lastName", value:event.target.value, type:"text"})
    }

    const setAgeHandler =(event)=>{

        setAge({id:"age", value:event.target.value})
    }

    
    const setGenderHandler =(event)=>{

        setGender({id:"gender", value:event.target.value})
    }

    const setaddressHandler =(event)=>{

        setAddress ({id:"address", value:event.target.value, type:"text"})
    }

    const  setStatusHandler=(event)=>{

        setStatus({id:"status", value:event.target.value, })
    }
    const kinNameHandler =(event)=>{

        setKinName({id:"kinName", value:event.target.value, type:"text"})
    }
    
    const kinNumberHandler =(event)=>{

        setkinNumber({id:"kinNumber", value:event.target.value, type:"number"})
    }

    const setUserDisplayHadler=()=>{
        const url = "/api/v1/user/profile";
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
                setUser(response.message);
                if (response.message.image) {
                    setFile({filename:require(`../../Assets/images/${response.message.image.filename}`)});
                }else{
                    setFile({filename:"Images/user.png"});
                }
                setPersonalRecord(response.PersonalRecord);
            }
        })
    }
    const setUserProfile=(event)=>{
        event.preventDefault();
        
        setAlert({alertDisplay:"display-none", spinnerDisplay:"block"})
        const first = firstName.value === ""?user.firstname:firstName.value; 
        const last  = lastName.value === ""?user.lastname:lastName.value;
        const newAge  = age.value === ""?user.age:age.value;
        const newGender  = gender.value === ""?user.gender:gender.value;
       let userData ={};
       userData = {"firstname": first,"lastname": last, "age":newAge, "gender":newGender};
       const url = "/api/v1/user/profile/update";
       fetch(url, {
           method: "PATCH",
           body:JSON.stringify(userData),
           headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
       })
       .then(res => res.json())
       .then(response => { console.log(response)
           if(response.status === 401) {
               sessionStorage.removeItem("user");
               window.location = "/login?Session expired please login."
           }else if (response.status === 201) {
                setAlert({alertDisplay:"block", spinnerDisplay:"display-none"})
                window.location.reload();
           }
       })
    
    }

    const setPersonalRecordHandler=(event)=>{
        event.preventDefault();
        const add = address.value !== ""?address.value:PersonalRecord.address===undefined?"N/A":PersonalRecord.address; 
        const stat = status.value !== ""?status.value:PersonalRecord.status===undefined?"N/A":PersonalRecord.status;
        const newkinName = kinName.value !== ""?kinName.value:PersonalRecord.kinName===undefined?"N/A":PersonalRecord.kinName;  
        const newkinNumber = kinNumber.value !== ""?kinNumber.value:PersonalRecord.kinNumber===undefined?0:PersonalRecord.kinNumber; 

        const personal = {"address":add, "status":stat, "kinName":newkinName, "kinNumber":newkinNumber}
        const url = "/api/v1/user/personalrecords/update"
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(personal),
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
            }else if (response.status === 201) {
                setAlert({alertDisplay:"block", spinnerDisplay:"display-none"})
                window.location.reload();
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

    return (
        <div>  
             <NavbarHeader />
            <Loading display={display.display}/> 
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
                                           <img className="img-thumbnail" width="100%" src={file.filename} alt="admin-profile-image"/>
                                           <Link to="/user/image/update">
                                                <small className="display-block">Click here to add a profile picture</small>
                                           </Link>
                                           </div>
                                            <div className="col-7 col-sm-7 col-md-7">
                                                <p><b>{user.firstname +" "+ user.lastname}</b></p>
                                                <p><b>Email:</b> {user.email}</p>
                                                <p><b>Age:</b> <Moment fromNow>{user.age}</Moment></p>
                                                <p><b>Gender:</b> {user.gender}</p>
                                                <p><b>Phone Numer:</b> +234{user.phonenumber}</p>
                                                <p><b>last login: </b> <Moment fromNow>{user.lastLogin}</Moment></p>
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
                                        <h3>Update Profile</h3>
                                    <form onSubmit={setUserProfile}>
                                    <div className="row"> 
                                        <div className="col-12 col-sm-12 col-md-8">
                                            <div className={"alert alert-success "+ alert.alertDisplay}>
                                                <p>Update successful</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input id={firstName.id} onChange={(event) => firstNameHandler(event,firstName.id)} type={firstName.type} className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder={user.firstname} value={firstName.value}  />
                                                
                                            </div>
                                                </div>
                                            <div className="col-12 col-sm-12 col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input id={lastName.id} onChange={(event) => lastNameHandler(event, lastName.id)} type={lastName.type} className="form-control" min="3" aria-describedby="lastname" name="lastname" placeholder={user.lastname} value={lastName.value}  />  
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phoneNumber">Age</label>
                                                    <input type="date" name="age" min="15" max="3" className="form-control"  aria-describedby="age" placeholder="Please enter your age" id={age.id} onChange={(event)=>setAgeHandler(event, age.id)} value={age.value} placeholder={user.age}  />
                                                    <small>{"Age- "+user.age}</small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Gender</label>
                                                    <select id={gender.id} onChange={(event)=>setGenderHandler(event, gender.id)} className="form-control">
                                                        <option value="Male">Male</option>
                                                        <option  value="Female">Female</option>
                                                        <option value="Others">Others</option>
                                                    </select>
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
                            <div className="card top-margin-sm">
                                <div className="card-body">
                                   <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <h3>Personal Information</h3>
                                <form onSubmit={setPersonalRecordHandler}>
                                    <div className="row"> 
                                        <div className="col-12 col-sm-12 col-md-8">
                                            <div className={"alert alert-success "+ alert.alertDisplay}>
                                                <p>Update successful</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address">Address</label>
                                                <input id={address.id} onChange={(event) => setaddressHandler(event,address.id)} type={address.type} className="form-control" min="3" aria-describedby="firstname" name="firstname" placeholder={PersonalRecord.address} value={address.value}  />
                                            </div>
                                                </div>
                                            <div className="col-12 col-sm-12 col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Status</label>
                                                    <select id={status.id} onChange={(event)=>setStatusHandler(event)} className="form-control">
                                                        <option value="Single">Single</option>
                                                        <option  value="Married">Married</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Next of Kin's Name</label>
                                                    <input id={kinName.id} onChange={(event) => kinNameHandler(event, lastName.id)} type={lastName.type} className="form-control" min="3" aria-describedby="lastname" name="lastname" placeholder={PersonalRecord.kinName} value={kinName.value}  />
                                                    
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Next of kin's number</label>
                                                    <input id={kinNumber.id} onChange={(event) => kinNumberHandler(event, kinNumber.id)} type="Number" className="form-control" min="3" aria-describedby="lastname" name="lastname" placeholder={PersonalRecord.kinNumber} value={kinNumber.value}  />
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
        <NavbarFooter />
    </div>
    )
}

export default userProfile;