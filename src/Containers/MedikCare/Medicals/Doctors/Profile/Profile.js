import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import Loading from "../../../Loading/Loading";
import NavbarHeader from "../../NavBar/NavBar"
import NavbarFooter from "../../NavBar/NavbarFooter";

const doctorProfile = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
    if (sessionItem === null) {
        window.location = "/doctor/login"
    }
    const [display, setDisplay] = useState({display:"display-block"});
    const [user, setUser] = useState({});
    const [file, setFile]  = useState({})
    const [doctorPersonalRecord, setdoctorPersonalRecord]  = useState({})
    const [logsDetails, setlogsDetails] = useState([]);
    const [logs, setLogs] = useState({start:0, end:5})
    const [firstName, setfirstName] = useState({id:"firstname", value:"", type:"text"})
    const [lastName, setlastName] = useState({id:"lastname", value:"", type:"text"})
    
    const [age, setAge] = useState({id:"age", value:""})
    const [address, setAddress] = useState({id:"adress", value:"", type:"text"})    
    const [folioNumber, setFolioNumber] = useState({id:"folioNumber", value:"", type:"text"})   
    const [year, setYear] = useState({id:"year", value:"", type:"date"})   
    const [specialty, setSpecialty] = useState({id:"specialty", value:"", type:"text"})    
    const [degree, setDegree] = useState({id:"degree", value:"",})    
    const [medicalSchool, setMedicalSchool] = useState({id:"medicalSchool", value:"", type:"text"})
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

    const  setDegreeHandler=(event)=>{

        setDegree({id:"degree", value:event.target.value, })
    }
    const setFolioNumberHandler =(event)=>{

        setFolioNumber({id:"folioNumber", value:event.target.value, type:"text"})
    }
    const setYearHandler =(event)=>{

        setYear({id:"year", value:event.target.value, type:"text"})
    }
    
    const setSpecialtyHandler =(event)=>{

        setSpecialty({id:"specialty", value:event.target.value, type:"text"})
    }
    
    const setMedicalSchoolHandler =(event)=>{

        setMedicalSchool({id:"medicalSchool", value:event.target.value, type:"number"})
    }

    const setUserDisplayHadler=()=>{
        const url = "http://192.168.33.12:3000/api/v1/doctor/profile";
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("doctor");
                window.location = "/doctor/login?Session expired please login."
            }else if (response.status === 200) { 
                setDisplay({display:"display-none"});
                setUser(response.message);
                if (response.message.image) {
                    setFile(response.message.image);
                }else{
                    setFile({filename:"user.png"});
                }
                if (response.doctorsRecord.annualPracticingLicence === undefined) {
                    response.doctorsRecord.annualPracticingLicence = <small className="text-danger">Not Uploaded <button className="btn btn-sm btn-medik">Upload</button></small>
                }else {
                    
                    response.doctorsRecord.annualPracticingLicence = <small className="text-success">Uploaded <button className="btn btn-sm btn-medik">Update</button></small>
                }
                setdoctorPersonalRecord(response.doctorsRecord);
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
       const url = "http://192.168.33.12:3000/api/v1/doctor/profile/update";
       fetch(url, {
           method: "PATCH",
           body:JSON.stringify(userData),
           headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
       })
       .then(res => res.json())
       .then(response => { 
           if(response.status === 401) {
               sessionStorage.removeItem("doctor");
               window.location = "/doctor/login?Session expired please login."
           }else if (response.status === 201) {
                setAlert({alertDisplay:"block", spinnerDisplay:"display-none"})
                window.location.reload();
           }
       })
    
    }

    const setPersonalRecordHandler=(event)=>{
        event.preventDefault();
        const add = address.value !== ""?address.value:doctorPersonalRecord.address===undefined?"N/A":doctorPersonalRecord.address; 
        const deg = degree.value !== ""?degree.value:doctorPersonalRecord.degree===undefined?"N/A":doctorPersonalRecord.degree;
        const newYear = year.value !== ""?year.value:doctorPersonalRecord.year===undefined?"N/A":doctorPersonalRecord.year;  
        const newSpecialty = specialty.value !== ""?specialty.value:doctorPersonalRecord.specialty===undefined?"N/A":doctorPersonalRecord.specialty;  
        const newmedicalSchool = medicalSchool.value !== ""?medicalSchool.value:doctorPersonalRecord.medicalSchool===undefined?0:doctorPersonalRecord.medicalSchool; 
        const newfolioNumber = folioNumber.value !== ""?folioNumber.value:doctorPersonalRecord.folioNumber===undefined?"N/A":doctorPersonalRecord.folioNumber;  
        
        const personal = {"address":add, "degree":deg, "year":newYear, "medicalSchool":newmedicalSchool, "specialty":newSpecialty,"folioNumber":newfolioNumber}
        const url = "http://192.168.33.12:3000/api/v1/doctors/records/update"
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(personal),
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 401) {
                sessionStorage.removeItem("doctor");
                window.location = "/doctor/login?Session expired please login."
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
                                           <img className="img-thumbnail" width="100%" src={"/Images/"+file.filename} alt="admin-profile-image"/>
                                           <Link to="/doctor/image/update">
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
                                                <p><b>Annual Practicing Licence File: </b><Link to="/doctor/upload/annual-practicing-licence/file">{doctorPersonalRecord.annualPracticingLicence}</Link></p>
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
                                <form onSubmit={setPersonalRecordHandler}>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12"><h3 className="medik-color">Medical Information</h3></div> 
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="address">Address</label>
                                                    <input type="text" name="address" className="form-control" id={address.id} onChange={(event)=> setaddressHandler(event, address.id)} placeholder={doctorPersonalRecord.address} ></input> 
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="medicalSchool">Medical School</label>
                                                    <input type="text" name="medicalSchool" className="form-control" id={medicalSchool.id} onChange={(event)=> setMedicalSchoolHandler(event, medicalSchool.id)} placeholder={doctorPersonalRecord.medicalSchool}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="degree">Degree</label>
                                                    <input type="text" name="degree" className="form-control" id={degree.id} onChange={event=> setDegreeHandler(event, degree.id)} placeholder={doctorPersonalRecord.degree}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="year">Date of Graduation</label>
                                                    <input type="date" name="year" className="form-control" id={year.id} onChange={event=> setYearHandler(event, year.id)} placeholder={doctorPersonalRecord.year}></input>
                                                    <small>Graduation: <Moment fromNow>{doctorPersonalRecord.year}</Moment></small>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="specialty">Specialty</label>
                                                    <input type="text" name="specialty" className="form-control" id={specialty.id} onChange={event=> setSpecialtyHandler(event, specialty.id)} placeholder={doctorPersonalRecord.specialty}></input>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="folioNumber">Folio Number</label>
                                                    <input type="text" name="folioNumber" className="form-control" id={folioNumber.id} onChange={event=>setFolioNumberHandler(event, folioNumber.id)} placeholder={doctorPersonalRecord.folioNumber}></input>
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

export default doctorProfile;