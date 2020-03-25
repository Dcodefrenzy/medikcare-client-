import React from 'react';
import { Link } from 'react-router-dom';

const RiskAssessment = (props) => {
  return (
        <div className={props.displayQuestions}>
            <div className="col-12 col-sm-12 col-md-12">
                <div className={`card opacity fixed b-medik`}>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed">
                    <main className="card top-margin-md">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 top-margin-md">
                                    <h3>COVID-19 Risk Assessment Caculator</h3>
                                </div>
                                <div className="col-12 top-margin-md">
                                    <h5>{props.askQuestion}</h5>
                                </div>
                                <div className="col-12 top-margin-sm">   
                                    <h5 onClick={event=>props.clickedYes(event, props.askpoint)} className="card-body btn-medik">Yes</h5>
                                </div>
                                <div className="col-12 top-margin-sm">
                                    <h5 onClick={event=>props.clickedNo(event)} className="card-body btn-primary">No</h5>
                                </div>
                            </div>
                        </div>
                    </main>
            </div>
        </div>
  )
}

export default RiskAssessment;