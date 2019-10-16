import React from 'react';
import NotFoundSvg  from "../Assets/svgs/page.svg";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <section className="container">
            <div className="col-12 col-sm-12 col-md-12">
                    <div className="row justify-content-center medik-color">
                        <div className="col-12"><img src={NotFoundSvg} alt="not-found-page" className="home-svg" /></div>
                        <h3>Whoops Page Not found</h3>
                        <div className="col-6 offset-5">
                        <Link to="/admin/dashboard"><button className="btn-sm btn-medik">Go back</button></Link>
                        </div>
                    </div>
            </div>
        </section>
        )
}

export default NotFound;