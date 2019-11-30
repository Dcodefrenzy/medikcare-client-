import React from 'react';



const Loading = (props) => {

    return(
    <div className={props.display}>
        <div className="col-12 col-sm-12 col-md-12">
            <div className="card fixed">
                <section className="section">
                <div className="row justify-content-center align-items-center medik-color"><i className="fa fa-spinner fa-pulse "></i><h1>Loading.....</h1></div>
                </section>
            </div>
        </div>
    </div>
    )
}

export default Loading;