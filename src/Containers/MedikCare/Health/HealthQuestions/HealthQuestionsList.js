import React from 'react';
import ItemNotFound from '../../ItemNotFound/ItemNotFound';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const HealthQuestionsList = (props) => {


    const question = props.questions.reverse().map((question, index)=>{
        const answersLength = props.answers.reverse().filter((answer)=>{
            return answer._questionId === question._id;    
        })
       
        const link = "/health/questions/answers/"+ question._id
        const date = <Moment fromNow>{question.createdAt}</Moment>
        return <Link to={link} className="href" key={question._id}>
                    <div className="border-bottom padding-sm">
                        <h3 className="text-dark"><i className="fa fa-user"></i> {question.topic}</h3>
                        <i className="fa fa-clock-o medik-color"> {date}</i>
                        <p className="text-dark">{question.description}</p>
                         <i className="fa fa-envelope text-dark"> {answersLength.length} Doctors Response</i>
                    </div>
                </Link>
    })

    return (
           <div className="row">
                <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                    <div className="card">
                        <div className="card-header bg-dark text-white"><h1>Health Questions</h1></div>
                        <div className="card-body">
                        <ItemNotFound display={props.noData}  />
                            <div className="">
                                {question}
                            </div>
                        </div>
                    </div>
                </div> 
           </div> 
    )
}

export default HealthQuestionsList;