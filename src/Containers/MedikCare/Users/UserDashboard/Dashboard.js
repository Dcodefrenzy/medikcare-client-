import React, {Component} from 'react';
import DashboardDetails from './DashboardDetails';
import NavbarFooter from '../NavBar/NavbarFooter';
import NavbarHeader from '../NavBar/NavBar';
import PopMessage from '../../PopMessage/PopMessage';
import Loading from '../../Loading/Loading';



class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "display-block",
            popMessage : {
                display: "display-none",
                card: "",
                message:"",
                welcome: "",
                
            },
        }
    }
    authentication = () => {
        const sessionItem = JSON.parse(sessionStorage.getItem("user"));

        if(sessionItem === null) {window.location = "/login?Hi-Visitor-you-have-to-login-before-you-can-access-a-page-on-the-platform"}
        else {this.setState({display:"display-none"})}
    }
    onLoadHandler = (event) => {
        const sessionItem = JSON.parse(sessionStorage.getItem("user"));
        if(window.location.href.includes('?')) {
            let result = window.location.href.split('?');
            result = result[1]; 
            const displayPopMessage = {
            ...this.state.popMessage
            }
            displayPopMessage.card = "card bg-success text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = decodeURI(result.replace(/-/g, ' '));
            displayPopMessage.welcome = " Welcome "+ sessionItem.name;
            this.setState({popMessage:displayPopMessage});
        }
    }
    removeOnloadHandler = (event) => {
        const displayPopMessage = {display:"display-none"}
        setTimeout(() => {
            this.setState({popMessage:displayPopMessage});
        }, 3000);
    }
 
    componentDidMount() {
        this.authentication();
        if(window.location.href.includes("?")){
            this.onLoadHandler();
            this.removeOnloadHandler();
        }

    }


    render() {
        return(
            <div>
                <Loading display={this.state.display}/>
                <div  className="container">
                    <NavbarHeader />
                    <div className="user-section">
                        <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                    </div>
                    <DashboardDetails />
                    <NavbarFooter />
                </div>
            </div>
        )
    }
}

export default UserDashboard;