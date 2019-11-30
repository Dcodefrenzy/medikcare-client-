import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import NavBarLink from './Links';

const SideBar = () => {
  
  const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
  const [admin, setAdmin] = useState({});
  const [file, setFile]  = useState({})

  const setUserDisplayHadler=()=>{
    const url = "http://192.168.33.12:3000/api/v1/admins/profile";
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
              setAdmin(response.message);
            setFile(response.message.image)
        }
    })
}

useEffect(()=>{
  setUserDisplayHadler();
}, [])

    return (
      <div className="col-0 col-sm-2 col-md-2 col-lg-1 d-none d-md-block ">
       
        <div className="card sidebar"><img className="rounded-circle" width="100px" height="100px" src={"/Images/"+file.filename} alt="admin-profile-image"/>
                <NavBarLink color="medik-color" />
           </div>
      </div>
    )
}

export default SideBar;
