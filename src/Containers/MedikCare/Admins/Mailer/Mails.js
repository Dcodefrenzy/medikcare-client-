import React, {useState, useEffect} from "react" ;

import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const AdminMailer = ()=>{
    const [admins, setAdmins] =useState([]);
    const [mailerItem, setMaillerItem] = useState([]);
 
    const sessionItem = JSON.parse(sessionStorage.getItem("admin"));

    const  fetchMailler =()=>{
        const url = "/api/v1/mailler/"
        fetch(url,{
            method:"GET",
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 200) {
                console.log(response.message)
                setMaillerItem(response.message)
       
            }
        })
    }

   const fetchAdmins = () =>{
       const url = "/api/v1/admins//blog";
        fetch(url, {
            method:"GET",
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 200) {
                setAdmins(response.admins)
            }
        })
    }

    const deleteMailer = (event, deleteArticle, blogId)=>{
        event.preventDefault();
        const url = "/api/v1/mailler/delete/"+blogId;
        fetch(url, {
            method:"PATCH",
            body:JSON.stringify({deleteArticle:deleteArticle}),
            headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if (response.status === 201) {
               
                location.reload();
            }else{
                console.log(response)
            }
        })
    }

    const notifyUsers =(event,id)=>{
        event.preventDefault();
            const url = "/api/v1/blogs/notify-users/"+id;
            fetch(url, {
                method:"POST",
                headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
            })
            .then(res=>res.json())
            .then(response=>{
                if (response.status === 201) {
                   
                   console.log(response);
                }else{
                    console.log(response)
                }
            })
    }

    useEffect(()=>{
        fetchMailler();
        fetchAdmins();
    }, [])
    const allMail = mailerItem.map((mailler)=>{
        let maillerSentColor;
            if (mailler.mailerSent === true) {
                mailler.mailerSent = "Sent"
                maillerSentColor = "text-success"
            }else{
                mailler.mailerSent = "Not sent yet"
                maillerSentColor= "text-primary"
            }

        return <div className="col-12 col-sm-6 col-md-4 top-margin-sm" key={mailler._id}>
                <div className="card">
                <Link to={`/admin/mail/${mailler._id}`}>
                <div className="card-body">
                <p className="text-dark"><b className="text-dark">Mail Topic:</b> {mailler.topic}</p>
                <p className={maillerSentColor}><b className="text-dark">Mail sent:</b> {mailler.mailerSent}</p>
                <p className="text-dark"><b>Times sent:</b> {mailler.maillerNumber}</p>          
                <p className="text-dark"><b>Created By:</b> {mailler._createdBy}</p>
                <p className="text-dark"><b className="text-dark">Time created: </b><Moment fromNow>{mailler.dateCreated}</Moment></p>
                <button className="btn btn-sm btn-danger" onClick={(event)=>deleteMailer(event, true,mailler._id)}>Delete</button>
               </div>
                </Link>
                </div>
        </div>
                                                  
    })
    return  (
        <div>
            <NavBar />
            <SideBar />
            <div className="top-margin-lg ">  
                <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12 col-sm-12 col-md-12">
                           <Link to="/admin/mail/add"> <button className="btn btn-sm btn-medik">Add New Mail</button></Link>
                            <div className="card">
                                <div className="card-header b-medik text-white">
                                    <h3>Mail Preview</h3>
                                </div>
                                <div className="card-body">
                                   <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="row">
                                                {allMail}
                                        </div>
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


export default AdminMailer;