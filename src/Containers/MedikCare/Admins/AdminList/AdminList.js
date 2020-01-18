import React, {Component} from 'react';
import SideBar from '../Navbar/SideBar';
import NavBar from '../Navbar/NavBar';
import AdminListTh from './AdminListTh';
import Loading from '../../Loading/Loading';
import ItemNotFound from '../../ItemNotFound/ItemNotFound';
import { Link } from 'react-router-dom';
import PopMessage from '../../PopMessage/PopMessage';
import AdminDetails from './AdminDetails/AdminDetails';
import AdminDelete from './AdminDetails/AdminDelete';


class AdminList extends Component {
    constructor(props) {
        super(props);
        this.sessionItem = JSON.parse(sessionStorage.getItem("admin"));
        this.state = {
            adminList: [],
            adminTable: {display:"table"},
            noList : {
                display: "display-none",
            },

            display: "display-block",

            popMessage : {
                display: "display-none",
                card: "",
                message:"",
                welcome: "",
            },
            adminDetails: {
                _id : "",
                firstname:"",
                lastname:"",
                email:"",
                phoneNumber:"",
                image:"",
                level:"",
                verification:"",
                dateCreated: "",
                createdBy:"",
                display:"display-none",
            },
            adminDelete: {
                _id : "",
                firstname:"",
                lastname:"",
                display:"display-none",
            },
        }
    }
    getAdmins = () => {
        const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
        if(sessionItem === null) {
            window.location = "/admin/login?Hi Admin you have to login before you can access a page on the admin platform"
        }else if(sessionItem.level !== 1) {
            window.location = "/page-not-found";
        }else { 
        const url = "/api/v1/admins/";
            fetch(url, {
                method: "GET",
                headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
            })
            .then(res => res.json())
            .then(response => {
                if(response.status === 401) {
                    sessionStorage.removeItem("admin");
                    window.location = "/admin/login?Session expired please login."

                }else if(response.status === 403) {
                    const displayBlock = "display-block";
                    const displayNone = "display-none"
                
                    this.setState({ adminList: displayBlock})
                    this.setState({adminTable : displayNone})
                    
                }else if(response.status === 200) {
                    const displayNone = "display-none";
                    this.setState({display : displayNone})
                    this.setState({adminList:response.admins,})    
                }
            })
        }
    } 
    onLoadHandler = (event) => {
        if(window.location.href.includes('?')) {
            const result = window.location.href.split('?');
           const  error = result[result.length-1]; 
            const displayPopMessage = {
            ...this.state.popMessage
            }
            displayPopMessage.card = "card bg-success text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = decodeURI(error);
            this.setState({popMessage:displayPopMessage});
        }
    }
    onClickHandler = (event, id) => {
        event.preventDefault();
        const adminDetails =  this.state.adminList.filter(admin => admin._id ===id );
        adminDetails[0].display = "display-block";
            this.setState({adminDetails:adminDetails[0]});   
    }
    
    reverseAdminDetailsHandler = (event) => {
        event.preventDefault();
        const adminDetails = {display:"display-none"};
        this.setState({adminDetails:adminDetails});
    }
    onDeleteHandler = (event, id) => {
        event.preventDefault();
        const adminDelete =  this.state.adminList.filter(admin => admin._id ===id );
        adminDelete[0].display = "display-block";
            this.setState({adminDelete:adminDelete[0]}); 
    }
    reverseAdminDeleteHandler = (event) => {
        event.persist();
        const adminDelete = {display:"display-none"};
        this.setState({adminDelete:adminDelete});
    }
    adminDelete = (event, id, deleteCode) => {
        event.preventDefault();
        const adminData = {};
        this.setState({display:"display-block"})
        adminData.deleteCode = deleteCode===0?1:0;
        const url = "/api/v1/admins/suspend/"+id;
        
        fetch(url, {
            method: "PATCH",
            body:JSON.stringify(adminData),
            headers: {'Content-Type': "application/json", "x-auth": this.sessionItem.token}
        })
        .then(res => res.json())
        .then(response => {
            if(response.status === 201) {
                const displayPopMessage = {};
            displayPopMessage.card = "card bg-success text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = response.message;
            this.reverseAdminDeleteHandler(event);
                this.setState({display:"display-none"})
                this.setState({popMessage:displayPopMessage})
                this.getAdmins();
            }
        })
    }

    componentDidMount () {
         this.getAdmins();
         this.onLoadHandler();
    }


    render() {
                const adminDetals = this.state.adminList.map((admin, index) => {
                    const fa = admin.deleteAdmin === false ? "fa fa-trash text-danger":"fa fa-trash text-success";
                         return   <AdminListTh 
                            key={admin._id} 
                            sn={index + 1} 
                            firstname={admin.firstname} 
                            lastname={admin.lastname} 
                            phonenumber={"+234"+admin.phoneNumber}
                            deleteAdmin={fa}
                            clicked={(event) => this.onClickHandler(event, admin._id)}
                            deleteClicked={(event)=>this.onDeleteHandler(event,  admin._id)}/>})
        return (
            <div>
                <Loading display={this.state.display}/>
                <AdminDetails display={this.state.adminDetails.display} 
                            name={this.state.adminDetails.firstname +" "+ this.state.adminDetails.lastname} 
                            email={this.state.adminDetails.email}
                            phonenumber={"+234" +this.state.adminDetails.phoneNumber}
                            level={this.state.adminDetails.level}
                            createdBy={this.state.adminDetails.createdBy}
                            image={this.state.adminDetails.image}
                            verification={this.state.adminDetails.verification===1?"Not verified" : "Verified"} 
                            dateCreated={this.state.adminDetails.dateCreated} clicked={(event)=>this.reverseAdminDetailsHandler(event)}/>

                <AdminDelete  display={this.state.adminDelete.display} 
                            name={this.state.adminDelete.firstname +" "+ this.state.adminDelete.lastname} 
                            deleteDetails={this.state.adminDelete.deleteAdmin===0?"Suspend":"Unsuspend"}
                             clicked={(event)=>this.reverseAdminDeleteHandler(event)}
                             adminDelete={(event)=> this.adminDelete(event, this.state.adminDelete._id, this.state.adminDelete.deleteAdmin)}/>
                <NavBar />
                <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                <div className="col-12  col-sm-12 col-md-12  col-lg-12  align-center top-padding-sm">
                    <h1>Admin Page</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <SideBar />
                        <div className="col-12 col-sm-12 col-md-9  col-lg-7 offset-lg-1 top-padding-sm">
                            
                        <div className="col-6 col-sm-6 offset-sm-8 col-md-6 offset-md-8 col-lg-6 offset-lg-9">
                            <Link to="/admin/register">
                            <button className="btn-sm btn-medik">Add New Admin</button>
                            </Link>
                            </div>
                            <div className="card">
                                <div className="card-header bg-dark"></div>
                                <div className="card-body">
                                    <ItemNotFound display={this.state.noList.display} />
                                    <table className={this.state.adminTable.display}>
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">S/N</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Phonumber</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { adminDetals }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AdminList