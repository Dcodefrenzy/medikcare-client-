import React, {useState, useEffect} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import ItemNotFound from '../../ItemNotFound/ItemNotFound';
import NavBar from '../Navbar/NavBar';
import DoctorsDetails from "./DoctorsDetails/DoctorsDetails";

const DoctorsListTh = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
    const [display, setDisplay] = useState({display:"display-block"});
    const [table, setTableDisplay] = useState({tableDisplay:"display-none", noItems:"display-none"})
    const [userDetails, setUserDetails] = useState([]);
    const [userDetail, setUserDetail]  = useState({});
    const [DoctorsDetail, setDoctorDetail] = useState({});
    const [userDisplay, setUserDisplay] = useState({display:"display-none"});
    const [doctorVerification, setDoctorVerification] = useState({})
    const [verifyDoctorMessage, setVerifyDoctorMessage] = useState({display:"display-none", message:""})

   const  fetchUsersHandeller  = ()=>{
        if(sessionItem === null) {
            window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
        }else if(sessionItem.level !== 1) {
            window.location = "/page-not-found";
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
            }else if(sessionItem.level !== 1) {
                window.location = "/page-not-found";
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
                    }else if (response.status === 200) {
                        setUserDetail(response.message)
                        setDoctorDetail(response.message._doctorId)
                        setUserDisplay({display:"display-block"})
                        setDoctorVerification(response.message._doctorId.adminVerification)    
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
        .then(response => {console.log(response) 
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
                            profileCompleted={DoctorsDetail.profileCompleted===true?"Completed" : "Not Completed"}
                            address={userDetail.address}
                            degree={userDetail.degree}
                            school={userDetail.medicalSchool}
                            year={userDetail.year}
                            specialty={userDetail.specialty}
                            folio={userDetail.folioNumber}
                            message={verifyDoctorMessage.message}
                            messageDisplay={verifyDoctorMessage.display}
                            dateCreated={userDetail.datecreated} clicked={(event)=>unsetUserDisplayHandler(event)}/>
 
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
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Phonumber</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userDetails.map((user, index)=>{
                                               const fa = user.verification === true ? "fa fa-check text-success":"fa fa-check text-warning";
                                              return  <tr key={user._id}>
                                                    <th scope="col">{index+1} <i className={fa}></i></th>
                                                    <td scope="col">{user.firstname}</td>
                                                    <td scope="col">{user.lastname}</td>
                                                    <td scope="col">{user.gender}</td>
                                                    <td scope="col">{"+234"+user.phonenumber}</td>
                                                    <td scope="col" onClick={(event)=>setUserDisplayHadler(event)} id={user._id} className="fa fa-eye text-primary"></td>
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