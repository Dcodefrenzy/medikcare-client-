import React, {useState, useEffect, createContext} from "react" ;
import Loading from '../../../Loading/Loading';
import SideBar from '../../Navbar/SideBar';
import ItemNotFound from '../../../ItemNotFound/ItemNotFound';
import NavBar from '../../Navbar/NavBar';
import UserDetails from "./UserDetails";

const UsersListTh = (props) => {
    const [display, setDisplay] = useState({display:"display-block"});
    const [table, setTableDisplay] = useState({tableDisplay:"display-none", noItems:"display-none"})
    const [userDetails, setUserDetails] = useState([]);
    const [userDetail, setUserDetail]  = useState({});
    const [userDisplay, setUserDisplay] = useState({display:"display-none"});

   const  fetchUsersHandeller  = ()=>{
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
        if(sessionItem === null) {
            window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
        }else if(sessionItem.level !== 1) {
            window.location = "/page-not-found";
        }else {
            const url = "/api/v1/user/users";
            fetch(url, {
                method: "GET",
                headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
            })
            .then(res => res.json())
            .then(response => {console.log(response)
                if(response.status === 401) {
                    sessionStorage.removeItem("admin");
                    window.location = "/admin/login?Session expired please login."
                }else if(response.status === 403) {
                    
                    setTableDisplay ({tableDisplay:"display-none", noItems:"block"})
                }else if(response.status === 200) {
                    const displayNone = "display-none";
                    setTableDisplay ({tableDisplay:"table", noItems:displayNone})
                    setDisplay({display:displayNone})   
                    setUserDetails(response.users)
                }
            })
        }
   }
   const setUserDisplayHadler = (event)=> {
            const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
            if(sessionItem === null) {
                window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
            }else if(sessionItem.level !== 1) {
                window.location = "/page-not-found";
            }else {
                const url = "http://192.168.33.12:3000/api/v1/user/admin/"+event.target.id;
                fetch(url, {
                    method: "GET",
                    headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
                })
                .then(res => res.json())
                .then(response => {console.log(response)
                    setUserDetail(response)
                    setUserDisplay({display:"display-block"})
                })
            }
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
                 
                <UserDetails display={userDisplay.display} 
                            name={userDetail.firstname +" "+ userDetail.lastname} 
                            email={userDetail.email}
                            phonenumber={"+234" +userDetail.phonenumber}
                            age={userDetail.age} gender={userDetail.gender}
                            loginStatus={userDetail.loginStatus===true?"Online":"Offline"}
                            lastLogin = {userDetail.lastLogin}
                            image={userDetail.image}
                            verification={userDetail.verification===true?"verified" : "Not Verified"} 
                            dateCreated={userDetail.datecreated} clicked={(event)=>unsetUserDisplayHandler(event)}/>
 
                 <NavBar />
                 <div className="col-12  col-sm-12 col-md-12  col-lg-12  align-center top-padding-sm">
                    <h1>Users Page</h1>
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

export default UsersListTh;