import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import Loading from "../../Loading/Loading";
import Moment from 'react-moment';
import 'moment-timezone';
import NavbarHeader from "../NavBar/NavBar";
import NavbarFooter from "../NavBar/NavbarFooter";


const MainActivity = (props) => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    if (sessionItem === null) {
        window.location = "/login"
    }
    const [display, setDisplay] = useState({display:"display-none"});
	const [logs, setLogs ] = useState([]);
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"})

    const setLogsHandler=()=>{
        const url = "/api/v1/logs/user";
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
                  setLogs(response.message);
            }
        })
    }
    const setLogsUpdateHandler=()=>{
        const url = "/api/v1/logs/update/user";
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
            }
        })
    }
    useEffect(()=>{
        setLogsHandler();
      }, [])
      useEffect(()=>{
        setLogsUpdateHandler();
      }, [])

      const logsDisplay = logs.sort().map((log, index)=>{
                return <div className="card" key={log._id}>
                <div className="card-body">
                    <i className="fa fa-bell-o fa-2x text-success float-right" aria-hidden="true"></i>
                    <h3 className="card-text text-dark">{log.title}</h3>
                    <span className="card-text text-dark float-right"><i className="fa fa-clock-o" aria-hidden="true"> <Moment fromNow>{log.date}</Moment></i> </span>
                    <h6 className="card-text">{log.description}.</h6>
                </div>
            </div>
      })
    return (
        <div className="container">  
            <Loading display={display.display}/> 
            <NavbarHeader />
        <div className="top-margin-md">                       
            <h1 className="text-dark text-center">Activities</h1>
            {logsDisplay}
        </div>
        <NavbarFooter />
    </div>
    )
}

export default MainActivity;