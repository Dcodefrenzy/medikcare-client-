import React from 'react';
import { Link } from 'react-router-dom';

const Carosel = (props) => {

    const listBreadcrumb = props.listItem.map((list, index)=>{
        return <li key={list.key} className="breadcrumb-item" aria-current="page"><Link  className="text-white" to={list.link}>{list.name}</Link></li>
        
    });
    return (
        <div className="user-section">
            <div className="row">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb b-medik ">
                            {listBreadcrumb}
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Carosel;