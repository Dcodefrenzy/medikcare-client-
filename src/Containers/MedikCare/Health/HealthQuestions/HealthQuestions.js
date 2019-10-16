import React, {Component} from 'react';
import HealthQuestionsList from './HealthQuestionsList';
import Carosel from '../../Users/Carosel/Carosel';
import Loading from '../../Loading/Loading';
import PopMessage from '../../PopMessage/PopMessage';



class HealthQuestions extends Component {
    constructor(props) {
        super(props)
        this.sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        this.sessionItemAdmin = JSON.parse(sessionStorage.getItem("doctor"));
        this.state= {
            carosel:[],
            questions:[],
            answers:[],
            popMessage : {
                display: "display-none",
                card: "",
                message:"",
                welcome: "",
            },
            noData : {
                display: "display-none",
            },
            display: "display-block"
        }
    }

    authentication = () => {
        if(this.sessionItemAdmin === null && this.sessionItemUser === null){
            window.history.back();
        }
        
    }
    breadcrumbHandler = () => {
        let homeLink = "";
        if(this.sessionItemUser === null && this.sessionItemAdmin !== null) {
             homeLink = "/doctor/dashboard"
        }else if(this.sessionItemUser !== null && this.sessionItemAdmin === null) {
             homeLink = "/user/dashboard"
        }
        
        const breadcrumbs = [
            {link:homeLink, name:"Home", key:"Home"},
            {link:"/health/questions", name:"Questions", key:"Questions"},

        ];
        this.setState({carosel:breadcrumbs});
    }
    healthQuestionsHandler = () => {
        let url = "";
        let sessionItem;
        if(this.sessionItemUser === null && this.sessionItemAdmin !== null){
            url = "http://192.168.33.12:3000/api/v1/question/doctor/questions";
            sessionItem = this.sessionItemAdmin;
        }else if(this.sessionItemUser !== null && this.sessionItemAdmin === null) {
            url = "http://192.168.33.12:3000/api/v1/question/user/questions";
            sessionItem = this.sessionItemUser;
        }
        fetch(url, {
            method:"GET",
            headers: {'Content-Type': "application/json", "u-auth": sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status === 401) {
                if(this.sessionItemUser === null && this.sessionItemAdmin !== null){
                    const displayNone = "display-none"
                this.setState({ display: displayNone})
                   sessionStorage.removeItem("doctor");
                   window.location = "/doctor/login?Session expired please login."
                }else if(this.sessionItemUser !== null && this.sessionItemAdmin === null) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
                }
            }else if(response.status === 403) {
                const noData = {};
                const displayNone = "display-none"
                noData.display = "display-none";
            
                this.setState({ noData: noData});
                this.setState({ display: displayNone})
            }else if(response.status === 200) {
                const displayNone = "display-none"
                this.setState({ display: displayNone})
                this.setState({questions:response.questions})
                this.setState({answers:response.answers})
            }
        })
        .catch(e => {
           if(e) { 
            const displayPopMessage ={};             
            displayPopMessage.card = "card bg-danger text-white";
            displayPopMessage.display = "row";
            displayPopMessage.message = "/health/questions?something-went-wrong-please-check-your-internet-connection-and-try-again.";
            this.setState({display:"display-none"})
            this.setState({popMessage:displayPopMessage});
              
            }
        })
    }

    componentDidMount() {
        this.authentication();
        this.breadcrumbHandler();
        this.healthQuestionsHandler();
    }
    render() {
        return(
            <div className="container">                
                <Loading display={this.state.display}/>
                <Carosel listItem={this.state.carosel} />
                <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                <HealthQuestionsList  noData={this.state.noData.display} questions={this.state.questions} answers={this.state.answers} />
            </div>
        )
    }
}

export default HealthQuestions;