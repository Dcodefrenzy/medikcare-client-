import React, {Component} from 'react';
import DashboardDetails from './DashboardDetails';
import NavbarFooter from '../../NavBar/NavbarFooter';
import NavbarHeader from '../../NavBar/NavBar';
import PopMessage from '../../../PopMessage/PopMessage';
import Loading from '../../../Loading/Loading';



class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcome:{
                name:"",
            },
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
        const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
        const welcome = {};

        welcome.name = sessionItem.name;
        if(sessionItem === null) {window.location = "/doctor/login?Hi-Visitor-you-have-to-login-before-you-can-access-a-page-on-the-platform"}
        else {
            this.setState({display:"display-none"})
            this.setState({welcome:welcome})
            console.log(welcome);
        }
    }
    onLoadHandler = (event) => {
        const sessionItem = JSON.parse(sessionStorage.getItem("doctor"));
        if(window.location.href.includes('?')) {
            let result = window.location.href.split('?');
            result = result[1]; 
            const displayPopMessage = {
            ...this.state.popMessage
            }
            displayPopMessage.welcome = " Welcome "+ sessionItem.name;
            displayPopMessage.card = "card bg-success text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = decodeURI(result.replace(/-/g, ' '));
           
           
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
                    <DashboardDetails welcomeName={this.state.welcome.name} />
                    <NavbarFooter />
                </div>
            </div>
        )
    }
}

export default DoctorDashboard;