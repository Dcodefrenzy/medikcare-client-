import React from 'react';
import ItemSvg  from "../Assets/svgs/no_item.svg";


const ItemNotFound = (props) => {
    return(
        <div className={props.display}>
            <div className="col-12 col-sm-12 col-md-12">
                    <div className="row justify-content-center medik-color">
                    <h3 className="">Whoops no data at this hour</h3>
                    <div className="col-8"><img src={ItemSvg} alt="not-found-page" className="home-svg" /></div>
                        
                    </div>
            </div>
        </div>
        )
}

export default ItemNotFound;