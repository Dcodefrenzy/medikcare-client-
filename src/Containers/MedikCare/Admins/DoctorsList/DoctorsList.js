import React, {useState, useEffect} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import ItemNotFound from '../../ItemNotFound/ItemNotFound';
import NavBar from '../Navbar/NavBar';
import DoctorsDetails from "./DoctorsDetails/DoctorsDetails";
import DoctorDelete from "./DoctorsDetails/DoctorDelete";

const DoctorsListTh = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [display, setDisplay] = useState({display:"display-block"});
    const [table, setTableDisplay] = useState({tableDisplay:"display-none", noItems:"display-none"})
    const [userDetails, setUserDetails] = useState([]);
    const [userDetail, setUserDetail]  = useState({});
    const [DoctorsDetail, setDoctorDetail] = useState({});
    const [userDisplay, setUserDisplay] = useState({display:"display-none"});
    const [doctorVerification, setDoctorVerification] = useState({});
    const [doctorDelete, setDoctorDelete] = useState({display:"display-none"})
    const [verifyDoctorMessage, setVerifyDoctorMessage] = useState({display:"display-none", message:""});

   const  fetchUsersHandeller  = ()=>{
        if(sessionItem === null) {
            window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
        }else {
            const url = "/api/v1/doctor/admin/doctors";
            fetch(url, {
                method: "GET",
                headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
            })
            .then(res => res.json())
            .then(response => {
                if(response.status === 401) {
                    sessionStorage.removeItem("admin");
                    window.location = "/admin/login?Session expired please login."
                }else if(response.status === 403) {
                    setTableDisplay ({tableDisplay:"display-none", noItems:"block"})
                }else if(response.status === 200) {
                    const displayNone = "display-none";
                    setTableDisplay ({tableDisplay:"table", noItems:displayNone})
                    setDisplay({display:displayNone})   
                    setUserDetails(response.message)
                }
            })
        }
   }
   const setUserDisplayHadler = (event)=> {
           
            if(sessionItem === null) {
                window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
            }else {
                const url = "/api/v1/doctors/records/admin/doctor/"+event.target.id;
                fetch(url, {
                    method: "GET",
                    headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
                })
                .then(res => res.json())
                .then(response => {
                    if(response.status === 401) {
                        sessionStorage.removeItem("admin");
                        window.location = "/admin/login?Session expired please login."
                    }else if (response.status === 200) {console.log(response.message._doctorId)
                        setUserDetail(response.message)
                        setDoctorDetail(response.message._doctorId)
                        setUserDisplay({display:"display-block"})
                        setDoctorVerification(response.message._doctorId.adminVerification)    
                    }
                })
            }
        }

        const setUserDeleteHadler = (event)=> {
           
            if(sessionItem === null) {
                window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
            }else {
                const url = "/api/v1/doctors/records/admin/doctor/"+event.target.id;
                fetch(url, {
                    method: "GET",
                    headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
                })
                .then(res => res.json())
                .then(response => {
                    if(response.status === 401) {
                        sessionStorage.removeItem("admin");
                        window.location = "/admin/login?Session expired please login."
                    }else if (response.status === 200) {console.log(response)
                        setUserDetail(response.message)
                        setDoctorDetail(response.message._doctorId)
                        setDoctorDelete({display:""})   
                    }
                })
            }
        }
    const verifyDoctor =(event)=>{
        const url = "/api/v1/doctor/admin/verify/"+event.target.id;
        fetch(url, {
            method: "PATCH",
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("admin");
                window.location = "/admin/login?Session expired please login."
            }else if (response.status === 201) {
                setVerifyDoctorMessage({display:"block", message:response.message})
            }
        })
    }
    const unsetUserDisplayHandler = (event)=>{
        event.preventDefault();
        setUserDisplay({display:"display-none"})
    }
const   reverseAdminDeleteHandler = (event) => {
        setDoctorDelete({display:"display-none"});
    }

const   doctorDeleteHandller = (event, id, deleteCode) => {
        event.preventDefault();
        const doctorData = {};
      
        setDisplay({display:"display-block"})
        doctorData.deleteUser = !deleteCode;
        const url = "/api/v1/doctor/admin/delete/"+id;
        console.log(doctorData)
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(doctorData),
            headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 201) {
                const displayPopMessage = {};
            displayPopMessage.card = "card bg-success text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = response.message;
            reverseAdminDeleteHandler(event);
                setDisplay({display:"display-none"})
                location.reload();
            }
        })
    }

   
    useEffect(()=>{
        fetchUsersHandeller();
    }, [])
 
    
    return (
            <div>
                <Loading display={display.display}/> 
                <DoctorsDetails display={userDisplay.display}  
                            name={DoctorsDetail.firstname +" "+ DoctorsDetail.lastname} 
                            email={DoctorsDetail.email}
                            phonenumber={"+234" +DoctorsDetail.phonenumber}
                            age={DoctorsDetail.age} gender={DoctorsDetail.gender}
                            loginStatus={DoctorsDetail.loginStatus===true?"Online":"Offline"}
                            lastLogin = {DoctorsDetail.lastLogin}
                            image={DoctorsDetail.image}
                            verify ={doctorVerification.verification=== false?<button onClick={(event)=>verifyDoctor(event)} id={DoctorsDetail._id} className="btn btn-sm btn-success">verify</button>:<span className="text-success">Verified</span>}
                            verification={DoctorsDetail.verification===true?"verified" : "Not Verified"} 
                            verificationButton={userDetail.verification===true?"display-none":""}
                            _id={DoctorsDetail._id}
                            profileCompleted={DoctorsDetail.profileCompleted===true?"Completed" : "Not Completed"}
                            address={userDetail.address}
                            degree={userDetail.degree}
                            school={userDetail.medicalSchool}
                            year={userDetail.year}
                            specialty={userDetail.specialty}
                            folio={userDetail.folioNumber}
                            message={verifyDoctorMessage.message}
                            messageDisplay={verifyDoctorMessage.display}
                            dateCreated={userDetail.dateCreated} clicked={(event)=>unsetUserDisplayHandler(event)}/>
                    <DoctorDelete  display={doctorDelete.display} 
                            name={DoctorsDetail.firstname +" "+DoctorsDetail.lastname} 
                            deleteDetails={DoctorsDetail.deleteUser===false?"Delete":"Undelete"}
                             clicked={(event)=>reverseAdminDeleteHandler(event)}
                             doctorDelete={(event)=>doctorDeleteHandller(event, DoctorsDetail._id, DoctorsDetail.deleteUser)}/>
    
                 <NavBar />
                 
                 <div className="col-12  col-sm-12 col-md-12  col-lg-12  align-center top-padding-sm">
                    <h1>Doctors Page</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <SideBar />
                        <div className="col-12 col-sm-12 col-md-9  col-lg-7 offset-lg-1 top-padding-sm">
                            <div className="card">
                                <div className="card-header bg-dark"></div>
                                <div className="card-body">
                                    <ItemNotFound display={table.noItems} />
                                    <table className={table.tableDisplay}>
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">S/N</th>
                                                <th scope="col">Fullname</th>
                                                <th scope="col">Gender</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userDetails.map((user, index)=>{
                                               const fa = user.verification === true ? "fa fa-check text-success":"fa fa-check text-warning";
                                               const trashColor = user.deleteUser === false?"text-danger":"text-success"
                                              return  <tr key={user._id}>
                                                    <th scope="col">{index+1} <i className={fa}></i></th>
                                                    <td scope="col">{user.firstname} {user.lastname}</td>
                                                    <td scope="col">{user.gender}</td>
                                                    <td scope="col">
                                                        <i onClick={(event)=>setUserDisplayHadler(event)} id={user._id} className="fa fa-eye text-primary"></i>
                                                        <i onClick={(event)=>setUserDeleteHadler(event)} id={user._id} className={`fa fa-trash ${trashColor}`}></i>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default DoctorsListTh;