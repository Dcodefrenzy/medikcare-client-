import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';



const HealthQuestionAnswers = (props) => {

    const date = <Moment fromNow>{props.question.createdAt}</Moment>
    const answer = props.answers.map((answer)=>{
      let button =  button =  <button onClick={event=>props.buttonClicked(event, answer._id)} className= "btn btn-sm btn-success" id={answer._id}>{props.buttonValue}</button> 
        if(props.doctorid !== null) {
              answer.agrees.filter((agree)=>{
                    if( props.doctorid._id === agree._doctorId) {
                        button =  <button  className= "btn btn-sm btn-success disabled" id={answer._id}>{props.buttonValue}</button> 
                        
                    }
            })
        }else if(props.userid !== null) {
            answer.thankYou.filter((thank)=>{
                    if( props.userid._id === thank._userId) {
                        button =  <button  className= "btn btn-sm btn-success disabled" id={answer._id}>{props.buttonValue}</button> 
                    }
            })
        }
        let top;
        if(Math.max(answer.agrees.length)){            
              top =  <i className="fa fa-star text-gold"> Top answer</i>
         
        }else{          
              top =  <i className="fa fa-star text-dark"> Top answer</i>
        }
        const date =<Moment fromNow>{answer.createdAt}</Moment>
      return  <div className="card top-margin-sm" key={answer._id}>
        <div className="card-body">
            <div className="border-bottom">     
                <h5><i className="fa fa-user"></i> {"DR "+answer._doctorId.firstname +" "+answer._doctorId.lastname}</h5>
                <i className="fa fa-clock-o medik-color"> {date}</i>
                <p className="text-dark"><i className="fa fa-phone"></i> Medicine and surgery (contact for private consultation)</p>
                <p>{answer.answer}</p>
                <div className="row justify-content-center">
                    <div className="display-show">
                       {button}
                    </div>
                    <div className={props.spinner}>
                        <div className="spinner-border text-success">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            </div>
            <i className="fa fa-heart text-success"> {answer.thankYou.length+" Thank You"} |</i>  <i className="fa fa-thumbs-up text-info"> {answer.agrees.length+" Doctors agrees"} |</i>  {top}
        </div>
    </div>
    })
    return (
            <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-chocolate"><i className="fa fa-user"></i> {props.question.topic}</h3>
                            <i className="fa fa-clock-o medik-color"> {date}</i>
                            <p>{props.question.description}</p>
                        </div>
                    </div>
                    <div className={props.answerForm}>
                        <div className="card">
                            <div className="card-body">
                            <h3>Answer</h3>
                                <form onSubmit={props.submitAnswer}>
                                    <div className="form-group">
                                    <label htmlFor="questionAnswer"></label>
                                    <textarea className="form-control" id={props.answerId} onChange={props.answerChange} required maxLength="200" placeholder="Please enter your answer here. Should not be more than 200 characters">
                                        
                                    </textarea>
                                    <input type="submit" className="btn-medik btn-lg" value="Answer"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="user-section">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="medik-color">Doctors Answers</h1>
                               {answer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default HealthQuestionAnswers