import React, {Component} from 'react';
import HealthQuestionAnswers from './HealthQuestionAnswers';
import Carosel from '../../Users/Carosel/Carosel';
import Loading from '../../Loading/Loading';
import PopMessage from '../../PopMessage/PopMessage';
import LoginSession from '../../Users/Logins/LoginSession';

class HealthQuestionAnswersClass extends Component {
    constructor() {
        super();
        this.sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        this.sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
        


        this.state= {
            answer:{
                id:"answer",
                value:"",
            },
            carosel:[],
            question:{},
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
            display: "display-none",
            answeFormDIsplay:"",
            appriciationButton:{
                value:"",
                display:""
            },
            spinner:"display-none",
            buttonClickedDisplay:"",
            loginSession:"display-none"
        }
    }


        
    breadcrumbHandler = () => {
        let homeLink = "";
        if(this.sessionItemUser === null && this.sessionItemDoctor !== null) {
             homeLink = "/doctor/dashboard"
        }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
             homeLink = "/user/dashboard"
        }
        
        const breadcrumbs = [
            {link:homeLink, name:"Home", key:"Home"},
            {link:"/health/questions", name:"Questions", key:"Questions"},

        ];
        this.setState({carosel:breadcrumbs});
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
            displayPopMessage.message = decodeURI(error.replace(/-/g, ' '));
            this.setState({popMessage:displayPopMessage});
        }
    }
    displayAnswerFormHandler=()=>{
        let answeFormDIsplay ="";
        if(this.sessionItemUser === null && this.sessionItemDoctor !== null) {
            answeFormDIsplay = "display-show";
             this.setState({answeFormDIsplay:answeFormDIsplay});
        }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
            answeFormDIsplay = "user-section display-none"
            this.setState({answeFormDIsplay:answeFormDIsplay});
        }
    }
    displayAppriciationButtonHandler = ()=>{
        let appriciationButton = {};
        appriciationButton.display = "btn btn-sm btn-success btn-center";
        if(this.sessionItemUser === null && this.sessionItemDoctor !== null) {
            appriciationButton.value = "Agree"
             this.setState({appriciationButton:appriciationButton});
        }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
            appriciationButton.value = "Thank";
            this.setState({appriciationButton:appriciationButton});
        }
    }
    onChangeHandler=(event, id)=>{
        event.preventDefault();
        const answer = {};
        answer.id = "answer";
        answer.value = event.target.value;
        this.setState({answer:answer});
    }
    answerSubmitHandler=(event)=>{
        event.preventDefault();
        this.setState({display:"block"})
        const answer={};
        answer.answer = this.state.answer.value;
        const id = this.props.match.params.id;
        const userId = this.state.question._userId;
        const url = "/api/v1/answer/"+id+"/"+userId;
       const token = this.sessionItemDoctor.token;
        fetch(url, {
            method:"POST",
            body:JSON.stringify(answer),
            headers: {'Content-Type': "application/json", "u-auth": token}
        })
        .then(res => res.json())
        .then(response => {console.log(response)
            if(response.status === 401) {
                if(this.sessionItemUser === null && this.sessionItemDoctor !== null){
                    const displayNone = "display-none"
                this.setState({ display: displayNone})
                   sessionStorage.removeItem("doctor");
                   window.location = "/doctor/login?Session expired please login."
                }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
                }
            }else if(response.status === 201) {
                window.location = "/health/questions/answers"+response.message;
            }
        })
        .catch(e=>{
            if(e) { 
                const displayPopMessage ={};             
                displayPopMessage.card = "card bg-danger text-white";
                displayPopMessage.display = "row";
                displayPopMessage.message = "something-went-wrong-please-check-your-internet-connection-and-try-again.";
                this.setState({display:"display-none"})
                this.setState({popMessage:displayPopMessage});
                  
                }
        })
    }
    getQuestionAndAnswersHandler = ()=>{
        let url = "";
        let sessionItem;
        let id = this.props.match.params.id;

        if(this.sessionItemUser === null && this.sessionItemDoctor !== null){
            url = "/api/v1/question/doctor/question/answers/"+id;
            sessionItem = this.sessionItemDoctor;
        }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
            url = "/api/v1/question/user/question/answers/"+id;
            sessionItem = this.sessionItemUser;
        }else{
            sessionItem = null;
        }
        if(sessionItem === null){
            this.setState({loginSession:"row"});
        }else{
            fetch(url, {
                method:"GET",
                headers:{"Content-Type":"application/json", "u-auth":sessionItem.token}
            })
            .then(res=>res.json())
            .then(response=>{console.log(response)
                if(response.status === 401) {
                    if(this.sessionItemUser === null && this.sessionItemAdmin !== null){
                        const displayNone = "display-none";
                    this.setState({ display: displayNone})
                       sessionStorage.removeItem("doctor");
                       window.location = "/doctor/login?Session expired please login.";
                    }else if(this.sessionItemUser !== null && this.sessionItemAdmin === null) {
                    sessionStorage.removeItem("user");
                    window.location = "/login?Session expired please login.";
                    }
                }else if(response.status === 200){
                    this.setState({question:response.question});
                    this.setState({answers:response.answers});
                }
            })
        }
       
    }
    buttonClickedHandler=(event)=>{
        event.preventDefault();
        let url = "";
        let sessionItem;
        let appriciationButton = {display:"display-none"}
        this.setState({appriciationButton:appriciationButton})
        this.setState({spinner:"display-show"});
        if(this.sessionItemUser === null && this.sessionItemDoctor !== null){
            url = "/api/v1/answer/agrees/"+event.target.id;
            sessionItem = this.sessionItemDoctor;
        }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
            url = "/api/v1/answer/thankyou/"+event.target.id;
            sessionItem = this.sessionItemUser;
        }
        fetch(url, {
            method:"PATCH",
            headers:{"Content-Type":"application/json", "u-auth":sessionItem.token}
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status === 401) {
                if(this.sessionItemUser === null && this.sessionItemDoctor !== null){
                    const displayNone = "display-none"
                this.setState({ display: displayNone})
                   sessionStorage.removeItem("doctor");
                   window.location = "/doctor/login?Session expired please login."
                }else if(this.sessionItemUser !== null && this.sessionItemDoctor === null) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
                }
            }else if(response.status === 201) {
                window.location = "/health/questions/answers/"+response._questionId;
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    componentDidMount(){
        if(this.sessionItemUser === null && this.sessionItemDoctor === null){
            this.setState({loginSession:"row"});
        }
    
        this.breadcrumbHandler();
        this.displayAnswerFormHandler();
        this.displayAppriciationButtonHandler();
        this.onLoadHandler();
        this.getQuestionAndAnswersHandler();
    }
    render() {
        return(
            <div className="container">
                 <Loading display={this.state.display}/>
                <Carosel listItem={this.state.carosel} />
                <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                <LoginSession display={this.state.loginSession}/>
                <HealthQuestionAnswers 
                doctorid={this.sessionItemDoctor}
                userid={this.sessionItemUser}
                buttonClicked={event=>this.buttonClickedHandler(event,this.id)}
                answerSubmit={this.buttonClickedDisplay}
                question={this.state.question}
                answers={this.state.answers}
                 answerForm={this.state.answeFormDIsplay} 
                 spinner={this.state.spinner}
                 buttonDisplay={this.state.appriciationButton.display} 
                 buttonValue={this.state.appriciationButton.value}
                 answerId={this.state.answer.id} answerValue={this.state.answer.value} answerChange={(event) => this.onChangeHandler(event, this.state.answer.id)}
                submitAnswer={(event)=>this.answerSubmitHandler(event)}
               />
            </div>
        )
    }
}

export default HealthQuestionAnswersClass;