import React, {Component} from 'react';
import NavbarHeader from '../NavBar/NavBar';
import NavbarFooter from '../NavBar/NavbarFooter';
import Carosel from '../Carosel/Carosel';
import Loading from '../../Loading/Loading';
import PopMessage from '../../PopMessage/PopMessage';


class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
        question:{
            topic:{
                id:"topic",
                value:"",
            },
            description:{
                id:"description",
                value:"",
            },
        },
            carosel:[],
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
    breadcrumbHandler = () => {
        const breadcrumbs = [
            {link:"/user/dashboard", name:"Home", key:"Home"},
            {link:"/user/question", name:"Question", key:"Question"},

        ];
        this.setState({carosel:breadcrumbs});
    }
    
    onchangeHandler=(event, id) =>{
        event.preventDefault();
         const question = { ...this.state.question}
         const newQuestion ={...question[id]}
         newQuestion.value = event.target.value;
         question[id] = newQuestion
         this.setState({question:question})
    }
    
    submitQuestionHandler = (event) => {
        event.preventDefault();
        this.setState({display:"display-block"})
        const sessionItem = JSON.parse(sessionStorage.getItem("user"));
        this.setState({display:"display-block"})
         const questionData = {};
         for (const key in this.state.question) {
             questionData[key] = this.state.question[key].value;
         }
         console.log(questionData)
         const url = "http://192.168.33.12:3000/api/v1/question/ask";
         fetch(url,{
             method:"POST",
             body:JSON.stringify(questionData),
             headers:{"Content-Type": "application/json", "u-auth": sessionItem.token}
         })
         .then(res=>res.json())
         .then(response=>{
             if(response.status === 401) {
                sessionStorage.removeItem("user");
                window.location = "/login?Session expired please login."
             }
            else if(response.status === 201) {
                window.location = "/health/questions?"+response.message;
            }
            else if(response.status ===403) {
                const displayPopMessage = {};
                displayPopMessage.card = "card bg-danger text-white";
                displayPopMessage.display = "row";
                displayPopMessage.message = response.message;
                    this.setState({display:"display-none"});
                    this.setState({popMessage:displayPopMessage});
            }
         })
    } 
    componentDidMount() {
        this.authentication();
        this.breadcrumbHandler();
    }

    render() {
        return (
            <div className="container">
                <Loading display={this.state.display}/>
                <NavbarHeader />
                <div className="user-section">
                    <Carosel listItem={this.state.carosel} />
                    <PopMessage display={this.state.popMessage.display} message={this.state.popMessage.message} welcome={this.state.popMessage.welcome} card={this.state.popMessage.card} />
                    <div className="col-12 col-sm-12 col-md-8 col-lg-6"><h1>HEALTH QUESTIONS</h1></div>
                    <div className="row">
                        <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                            <div className="card">
                                <div className="card-body">
                                    <div className="user-section">
                                        <form method="POST" onSubmit={this.submitQuestionHandler}>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="Text" className="medik-color">Question Title</label>
                                                        <input type="text" className="form-control" name="topic" placeholder="E.g My head Aches" id={this.state.question.topic.id} onChange={(event)=>this.onchangeHandler(event, this.state.question.topic.id)} value={this.state.question.topic.value} required />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="firstName" className="medik-color">Ask a health question</label>
                                                        <textarea className="form-control" name="description" id={this.state.question.description.id} onChange={(event)=>this.onchangeHandler(event, this.state.question.description.id)} value={this.state.question.description.value} required>Ask our doctors anything</textarea>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control btn-medik" type="submit"  />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card">
                                        <div className="card-header b-medik text-white"><h3>Tips For Asking Questions</h3></div>
                                        <div className="card-body">
                                            <p><b className="medik-color">Detailed:</b> Doctors are not magictians so when asking a question please give details.</p>
                                            <p><b className="medik-color">Anonymity:</b> We ensure that most of your details are hidden from people so feel free to express your question.</p>
                                            <p><b className="medik-color">Intercession:</b> If you are representing a someone eg, your child, mother etc, please ensure you give details like their age, gender.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NavbarFooter />
            </div>
        )
    }
}

export default Question;