import React, {useState} from "react" ;
import Loading from '../../Loading/Loading';





const AdminMailUsers = (props)=>{
const sessionItem = JSON.parse(sessionStorage.getItem("admin"));


const [display, setDisplay] = useState({display:"display-none"});
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"});
const [externalUsers, setExternalUsers] = useState({bool:false});
const [usersMail, setUsersMail] = useState({value:"", display:"display-none"})



const externalStateHandler = (event, result)=>{
    if (result === true) {
        
    setUsersMail({value:event.target.value, display:"display-none"})
    }else{
    setUsersMail({value:event.target.value, display:""})
    }
    setExternalUsers({bool:!result});

}
const validateUsersMail = (event)=>{
setUsersMail({value:event.target.value, display:""})
}
const mailUsers=(event)=>{
    event.preventDefault();
    let url
    const mailler = {externalUsers:usersMail.value};
    if (externalUsers.bool === true) {
         url = "/api/v1/mailler/notify-external-users/"+props.id;
    }else{
         url = "/api/v1/mailler/notify-users/"+props.id;
    }
    console.log(mailler)
    fetch(url, {
        method:"POST",
        body:JSON.stringify(mailler),
        headers:{'Content-Type': "application/json", "x-auth": sessionItem.token}
    })
    .then(res=>res.json())
    .then(response=>{
        if (response.status === 201) {
            console.log(response)
            window.location ="/admin/mail/";
        }else{
            console.log(response)
        }
    })
}








    return  (
        <div>   
        <div className={`col-12 col-sm-12 col-md-6 offset-md-3 ${props.display}`}>
            <div className="card bg-dark opacity-7 fixed">
               
            </div>
        </div>  
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed top-margin-lg ${props.display}`}>
                    <main className="card opacity">
                            <div className="card-header  home-content"> 
                            <i onClick={props.click}  className="float-right fa fa-times" arialhidden="true"></i>  
                                    <h1>Blog Images</h1>
                                    <span>please upload a blog image.</span> 
                                    <form onSubmit={mailUsers}>
                                    <div className="row">                                        
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="mails">Do you want to send mail to client outside our app? </label>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                    <span onClick={event=>externalStateHandler(event, externalUsers.bool)} className="slider round"></span>
                                            </label>
                                                <textarea className={`form-control ${usersMail.display}`} onChange={event=>validateUsersMail(event)} placeholder="Please here is where you add the mails of external users.Do not forget to add , after every mail"></textarea>
                                            </div>
                                        </div>
                                        </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className={alert.spinnerDisplay}>
                                                <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                            </div>
                                            <div className="form-group">
                                                <input className="btn-medik form-control" type="submit" name="update" value="Send Mail"/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                     </form>
                            </div>
                        </main>
                    
                    </div>
           
        </div>
    )
}


export default AdminMailUsers;