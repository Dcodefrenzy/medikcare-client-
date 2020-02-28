import React, { Component } from 'react';
import SideBar from './Navbar/SideBar';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './Navbar/NavBar';
import PopMessage from '../PopMessage/PopMessage';
import Loading from '../Loading/Loading';


class AdminDashboard extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            popMessage : {
                display: "display-none",
                card: "",
                message:"",
                welcome: "",
                
            },
            display: "display-block",
        }
    }
    authentication = () => {
        const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
        if(sessionItem === null) {window.location = "/admin/login?Hi-Admin-you-have-to-login-before-you-can-access-a-page-on-the-admin-platform"}
        else {this.setState({display:"display-none"})}
    }
    onLoadHandler = (event) => {
        const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
        if(window.location.href.includes('?')) {
            let result = window.location.href.split('?');
            result = result[1]; 
            const displayPopMessage = {
            ...this.state.popMessage
            }
            displayPopMessage.card = "card bg-success text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = decodeURI(result.replace(/-/g, ' '));
            displayPopMessage.welcome = " Welcome Admin "+ sessionItem.name;
            this.setState({popMessage:displayPopMessage});
        }
    }
    
    componentDidMount() {
        this.authentication();
        this.onLoadHandler();
       }


    render() {
        return(
            <div>
                <Loading display={this.state.display}/>
                <NavBar />
                <div className="col-10 col-sm-12">
                <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                
                </div>
                <div className="container-fluid">
                    <div className="row">
                         <SideBar />
                        <Dashboard />
                    </div>
                </div>
    
            </div>
        )
    }
}
export default AdminDashboard;