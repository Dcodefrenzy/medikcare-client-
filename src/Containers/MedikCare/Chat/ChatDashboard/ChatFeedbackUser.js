import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import LoginSession from "../../Users/Logins/LoginSession";



const ChatFeedbackUser = (props) => {
    const to = props.match.params.id;
    const chatSessionId = props.match.params.sessionId;
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    const [medikImprove, setMedikImprove] = useState({id:"medikImprove",value:""})
    const [doctorImprove, setDoctorImprove] = useState({id:"doctorImprove",value:""})
    const [improve, setImprove] = useState({id:"improve",value:""})
    const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none", formDisplay:""})
    const [loginSession, setLoginSession] = useState({display:"display-none"})
    const [userSession, setuserSession] = useState({})
        
    const setMedikImproveHandler =(event)=>{ setMedikImprove({id:"medikImprove", value:event.target.value}) }
    const setDoctorImproveHandler =(event)=>{ setDoctorImprove({id:"doctorImprove", value:event.target.value}) }
    const setImproveHandler =(event)=>{ setImprove({id:"improve", value:event.target.value}) }
    const checkSession = ()=>{
        if (sessionItem === null) {
            setLoginSession({display:"row"})
        }else{
            fetchUserSession();
        }
    }


    const fetchUserSession=()=>{ 
        const url = "/api/v1/chatSession/user/"+sessionItem._id;
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { 
            if(response.status === 401) {
                sessionStorage.removeItem("user");
                setLoginSession({display:"row"});
            }else if (response.status === 200) {
               
                setuserSession(response.message)
            }
        })
    }


    const submitChatMetricHandler=(event)=>{
        event.preventDefault(); 
        let metricTitle;
        let docMetricTitle;
        
        setAlert({alertDisplay:"display-none", spinnerDisplay:"", formDisplay:""})
        if (medikImprove.value === "1") {
            metricTitle = "Not useful at all"
        }
        else if (medikImprove.value === "2") {
            metricTitle = "Slightly useful"
        }
        else if (medikImprove.value === "3") {
            metricTitle = "Worth my time"
        }
        else if (medikImprove.value === "4") {
            metricTitle = "Really great"
        }
        else if (medikImprove.value ==="5") {
            metricTitle = "Transformational"
        }
        
        if (doctorImprove.value === "1") {
            docMetricTitle = "Terrible"
        }
        else if (doctorImprove.value === "2") {
            docMetricTitle = "Managable"
        }
        else if (doctorImprove.value === "3") {
            docMetricTitle = "Good"
        }
        else if (doctorImprove.value === "4") {
            docMetricTitle = "Really great"
        }
        else if (doctorImprove.value === "5") {
            docMetricTitle = "Just perfect"
        }

        const metrics = {"metric":parseInt(medikImprove.value), "metricTitle":metricTitle, "userType":"User", "description":improve.value, "docMetric": parseInt(doctorImprove.value), "docMetricTitle":docMetricTitle, "chatSessionId":userSession._id,"_userId":sessionItem._id, "_doctorId":to}
      
        const url = "/api/v1/user/chatMetric/add"
        fetch(url, {
            method: "POST",
            body:JSON.stringify(metrics),
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 401) {
                sessionStorage.removeItem("user");  
            setLoginSession({display:"row"})
            }else if (response.status === 201) {
                setAlert({alertDisplay:"row", spinnerDisplay:"display-none", formDisplay:"display-none"})
            }else if (response.status === 200) {
                setAlert({alertDisplay:"row", spinnerDisplay:"display-none", formDisplay:"display-none"});
            }
        })
    }


    useEffect(()=>{
        checkSession();
    }, [])

    return(
    <div className={props.display}>
        <div className="col-12 col-sm-12 col-md-12 bg-dark">
            <div className="card b-medik">
                <Link to={"/chat/"+props.match.params.id} className="card-body"> 
                    <button className="btn-sm btn-dark">Go back</button>
                </Link>
                <div className="section">
                    <div className="row justify-content-center align-items-center text-white">
                        
                <div className="container verification">
                    <div className={alert.alertDisplay}>
                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
                            <div className="card b-medik">
                                <div className="card-body">
                                    <h3 className="text-white">Verification</h3>
                                    <h1 className="text-center top-margin-md">😎</h1>
                                    <p className="top-margin-md text-white">Thank you for filling our Feedback, This will go a long way in creating a better experince on our application.👍</p>
                                   <div className="col-10 offset-3 col-sm-10 offset-sm-4 col-md-10 offset-md-4 col-lg-10 offset-lg-4 top-margin-md"> 
                                        <Link to="/user/dashboard">
                                                <button className="btn btn-medik top-margin-md">Go to dashboard</button>
                                            </Link>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className={`${alert.formDisplay}`}>
                    <LoginSession display={loginSession.display} />
                                <div className="card-body">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <h2>Feedback Time!</h2>
                                        <p className="top-margin-sm">Please spare a minute to fill this</p>
                                    <form onSubmit={submitChatMetricHandler}>
                                    <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Help us improve! How useful was our platform?</label>
                                                    <select id={medikImprove.id} onChange={(event)=>setMedikImproveHandler(event, medikImprove.id)} className="form-control">
                                                        <option value="None">Please select</option>
                                                        <option value="1">1 – Not useful at all</option>
                                                        <option  value="2">2 – Slightly useful</option>
                                                        <option value="3">3- Worth my time</option>
                                                        <option value="4">4 – Really great</option>
                                                        <option value="5">5 – Transformational</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>How well did our medical personel attended to you?</label>
                                                    <select id={doctorImprove.id} onChange={(event)=>setDoctorImproveHandler(event, doctorImprove.id)} className="form-control">
                                                        <option value="None">Please select</option>
                                                        <option value="1">1 – Terrible</option>
                                                        <option  value="2">2 – Managable</option>
                                                        <option value="3">3- Good</option>
                                                        <option value="4">4 – Really great</option>
                                                        <option value="5">5 – Just perfect</option>
                                                        
                                                    </select>
                                                </div>
                                            </div> <div className="col-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <label>How and were can we improve. <span className="text-danger">(optional)</span></label>
                                                   <textarea id={improve.id} onChange={(event)=>setImproveHandler(event, improve.id)} className="form-control"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className={alert.spinnerDisplay}>
                                                <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                            </div>
                                            <div className="form-group">
                                                <input className="btn-medik form-control" type="submit" name="Submit" value="submit"/>
                                                
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
    </div>
    )
}

export default ChatFeedbackUser;