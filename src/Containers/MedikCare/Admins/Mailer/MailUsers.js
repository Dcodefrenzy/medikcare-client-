import React, {useState, useEffect, createContext} from "react" ;
import Loading from '../../Loading/Loading';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import CKEditor from 'ckeditor4-react';




const AdminMailUsers = (props)=>{
const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
const maillerId = props.match.params.id;

const [display, setDisplay] = useState({display:"display-none"});
const   [alert, setAlert]= useState({alertDisplay:"display-none", spinnerDisplay:"display-none"});










    return  (
        <div>   
        <div className={`col-12 col-sm-12 col-md-6 offset-md-3 ${props.display}`}>
            <div className="card bg-dark opacity-7 fixed">
               
            </div>
        </div>  
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed top-margin-lg ${props.display}`}>
                    <main className="card opacity">
                            <div className="card-header  home-content"> 
                            <i  className="float-right fa fa-times" arialhidden="true"></i>  
                                    <h1>Blog Images</h1>
                                    <span>please upload a blog image.</span> 
                            </div>
                        </main>
                    
                    </div>
           
        </div>
    )
}


export default AdminMailUsers;