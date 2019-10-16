import React from 'react';



const Loading = (props) => {

    return(
    <div className={props.display}>
        <div className="col-12 col-sm-12 col-md-12">
            <div className="card fixed">
            <div className="row medik-color"><i className="fa fa-spinner fa-pulse "></i><h1>Loading.....</h1></div>
            </div>
        </div>
    </div>
    )
}

export default Loading;