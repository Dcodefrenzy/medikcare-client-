import React, {useState} from "react" ;
import { Link } from 'react-router-dom';

const DeleteAnswer = (props) => {
    const   [alert, setAlert]= useState({formDisplay:"display-none", spinnerDisplay:"display-none"});
    const sessionItemDoc = JSON.parse(sessionStorage.getItem("doctor"));
    
    const deleteEditHandler=(event, id)=>{
        event.preventDefault();
        setAlert({formDisplay:"display-none", spinnerDisplay:""})
       const url = "/api/v1/answer/delete/"+id;
        fetch(url, {
            method: "PATCH",
            headers: {'Content-Type': "application/json", "u-auth": sessionItemDoc.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 201) {
                setAlert({formDisplay:"alert alert-success ", spinnerDisplay:"display-none"})
                location.reload();
                console.log("yay worked!")
             }else if(response.status === 403) {
                setAlert({formDisplay:"", spinnerDisplay:"display-none"})
             }else if(response.status === 400) {  
                 
                setAlert({formDisplay:"", spinnerDisplay:"display-none"})
             }
        })
    }
  

    return (
        <div className={props.toggle.display}>
           
           <div className={`col-12 col-sm-12 col-md-6 offset-md-3`}>
                <div className="card bg-dark opacity-7 fixed">
                </div>
            </div>  

                    <div className={`col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed top-margin-lg`}>
                    <main className="card opacity">
                            <div className="card-header  home-content"> 
                            <i onClick={props.click} className="float-right fa fa-times" arialhidden="true"></i>  
                                    <h1>Delete an health answer</h1>
                                    <span>Do you want to delete the following answer?</span> 
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 bottom-margin-md">    
                                    <div className={alert.formDisplay}>
                                        <p>Delete successful</p>
                                    </div>
                                <p>{props.personalAnswerUpdate}</p>
                                <div className="top-margin-sm">
                                    
                                <button onClick={event=>deleteEditHandler(event, props.personalAnswerUpdateId)} className="btn btn-danger btn-sm">Yes</button> <button onClick={props.click} className="btn btn-primary btn-sm">No</button>
                                </div>
                            </div>
                        </main>
                    
                    </div>
        </div>
    )
}

export default DeleteAnswer;