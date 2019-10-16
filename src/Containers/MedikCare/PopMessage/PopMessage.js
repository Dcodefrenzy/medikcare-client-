import React from 'react';

const PopMessage = (props) => {

    return (
        <div className={props.display}>
            <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                <div className={ props.card }>
                    <div className="card-body">
                    <h3>{ props.message }</h3>
                    <p>{props.welcome}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopMessage;