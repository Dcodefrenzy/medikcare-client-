import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading';
import No_item  from '../../Assets/svgs/no_item.svg';
import Report  from '../../Assets/svgs/report.svg';
import Moment from 'react-moment';
import 'moment-timezone';


const UserReport= (props)=>{
  const  id = props.match.params.id
    
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    const [display, setDisplay]  = useState({display:"block"});
    const [report, setReport] = useState({});
    const [notfound, setNotFound] =useState({display:"display-none"})
    const [doctor, setDoctor] = useState({})
const   authentication = () => {
    if(sessionItem === null) {window.location = "/login?Hi-Visitor-you-have-to-login-before-you-can-access-a-page-on-the-platform"}
    else { setDisplay({display:"display-none"});}
}
const setReportsHandler = ()=>{
    const url = "/api/v1/user/report/"+id;
    fetch(url, {
        method: "GET",
        headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
    })
    .then(res=>res.json())
    .then(response => {
        if (response.status === 200) {
            setReport(response.message)
            setDoctor({doc:response.doctor});
            console.log(response)
        }else if (response.status === 404) {
            
        }
    })
}
useEffect(()=>{
    authentication();
    setReportsHandler();
  }, [])


    return (
    <div className="container-fluid">

        <Loading display={display.display}/>
        <section className="user-section">
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 offset-md-3 offset-lg-3 ">
                <div className="user-dashboard-content">
                <h1>User Medical Report</h1>
                <Link to="/user/reports">  
                <i className="fa fa-arrow-left text-dark">Back</i>
                </Link>
                    <div className="user-section">
                        
                        <h6 className="text-success"><b className="text-dark">Report By-</b> {doctor.doc}</h6>
                        <p className="text-dark top-margin-sm"><Moment fromNow>{report.dateCreated}</Moment></p>  
                                        
                        <div className="card bottom-margin-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8">
                                        <h3 className="text-dark">Health Complain</h3>
                                        <p>{report.complains}</p>                                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card bottom-margin-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8">
                                        <h3 className="text-dark">Diagnoses</h3>
                                        <p>{report.diagnoses}</p>                                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card bottom-margin-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8">
                                        <h3 className="text-dark">Medication</h3> 
                                        <p>{report.medication}</p>                                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card bottom-margin-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8">
                                        <h3 className="text-dark">Lab Test</h3>
                                        <p>{report.diagnoses}</p>                                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`card bottom-margin-sm ${notfound.display}`}>
                                <div className="card-body">
                                    <div className="row">
                                       <div className="col-7 offset-3 col-sm-8 offset-sm-3 col-md-8  offset-md-3text-center">  
    							            <h5>Hurray there are no medical reports yet.</h5>
                                       </div>
                                        <div className="col-12 col-sm-12 col-md-12">
    							            <img src={ No_item } alt="health-questions" className='home-svg'/>
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
export default UserReport;