import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';

const EditAnswer = (props) => {
    const [answer, setAnswer] = useState({id:"answer", value:""});
    const   [alert, setAlert]= useState({formDisplay:"", spinnerDisplay:"display-none"});

    const sessionItemDoc = JSON.parse(sessionStorage.getItem("doctor"));
    const answerEditHandler=(event, body, id)=>{
        event.preventDefault();
        setAlert({formDisplay:"display-none", spinnerDisplay:""})
        const answerData = {"answer":body};
       const url = "/api/v1/answer/update/"+id;
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(answerData),
            headers: {'Content-Type': "application/json", "u-auth": sessionItemDoc.token}
        })
        .then(res => res.json())
        .then(response => { console.log(response)
            if(response.status === 201) {
                setAlert({formDisplay:"alert alert-success ", spinnerDisplay:"display-none"})
                window.location.reload();
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
                                    <h1>Edit answers</h1>
                                    <span>please edit your health answer here.</span> 
                            </div>
                            <form onSubmit={event=>answerEditHandler(event,props.personalAnswerUpdate, props.personalAnswerUpdateId)}>          
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className={alert.formDisplay}>
                                        <p>Update successful</p>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="questionAnswer">Health Answer</label>
                                    <textarea className="form-control" onChange={event=>props.showEdit(event)}  id={answer.id}  required maxLength="500" value= {props.personalAnswerUpdate} placeholder="Please enter your answer here. Should not be more than 500 characters">
                                    </textarea>
                                        </div>
                                </div>
                                    <div className="">
                                            <div className="col-6 col-sm-6 col-md-6">
                                                <div className={alert.spinnerDisplay}>
                                                    <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                                </div>
                                                <div className="form-group">
                                                    <input className="btn-medik form-control" type="submit" name="update" value="Update"/>
                                                </div>
                                            </div>
                                    </div>    
                            </form>
                        </main>
                    
                    </div>
        </div>
    )
}

export default EditAnswer;