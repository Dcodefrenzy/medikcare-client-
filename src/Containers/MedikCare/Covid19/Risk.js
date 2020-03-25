import React, {useState, useEffect} from "react" ;
import { Link } from 'react-router-dom';
import RiskAssessment from "./RiskAssessment";
import RiskCaculator from "./RiskCaculator";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
  } from "react-share";

const Risk = (props) => {
    let riskQuestions = 
    [
        {"question":"Do you have Cough?", "point":1},
       {"question":"Do you have Colds?", "point":1},
       {"question":"Do you have Diarrhea?", "point":1},
       {"question":"Do you have Sore Throat?", "point":1},
       {"question":"Do you have Body Aches?", "point":1},
       {"question":"Do you have Headache?", "point":1},
       {"question":"Do you have fever(Temperature 37.8 C and above)?", "point":1},
       {"question":"Do you have difficulty Breathing?", "point":2},
       {"question":"Are you experiencing Fatigue?", "point":2},
       {"question":"Have you traveled recently durring the past 14 days?", "point":3},
       {"question":"Do you have a travel history to a COVID-19 Infected area?", "point":3},
       {"question":"Do you have direct contact or is taking care of a positive COVID-19 patient?", "point":3},
       
    ]
    const [count, setCounter] =useState(0)
    const [score, setScore] =useState(0)
    
    const [timeOutCount, setTimeOutCount] =useState(0)
    const [display, setDisplay] =useState({display:""})
    const [questionDisplay, setQuestinDisplay] = useState({display:"display-none"}) 
    const [ask, setQuestions] = useState({});

    const [result, setResult]=useState("display-none")
    const [resultRisk, setResultRisk] =useState({low:"display-none", medium:"display-none", high:"display-none"})
    const [riskColor, setRiskColor] = useState("") 


const yes = (event, point)=>{
    const newCount = count + 1;
    const newScore = score +point;

    if (riskQuestions.length-1 === count) {
        setScore(newScore);
        setQuestinDisplay({display:"display-none"})
        setDisplay({display:"display-none"})
        setResult("")
        if (score < 5) {
           
            setResultRisk({low:"", medium:"display-none", high:"display-none"});
            setRiskColor("text-success")
        }else if(score < 12){
        
            setResultRisk({low:"display-none", medium:"", high:"display-none"});
            setRiskColor("text-warning")
        }else if(score > 12){
        
            setResultRisk({low:"display-none", medium:"display-none", high:""});
            setRiskColor("text-danger")
        }
    } else {
        setScore(newScore);
        setCounter(newCount);
    setQuestions(riskQuestions[newCount]);
    }
 
 
}

const no = (event)=>{
    const newCount = count + 1;
    const newScore = score + 0;
    if (riskQuestions.length-1 === count) {
        setScore(newScore);
        setQuestinDisplay({display:"display-none"})
        setDisplay({display:"display-none"})
        setResult("")
        if (score < 5) {
            setResultRisk({low:"", medium:"display-none", high:"display-none"});
            setRiskColor("text-success")
        }else if(score < 12){
        
            setResultRisk({low:"display-none", medium:"", high:"display-none"});
            setRiskColor("text-warning")
        }else if(score > 12){
        
            setResultRisk({low:"display-none", medium:"display-none", high:""});
            setRiskColor("text-danger")
        }
    } else {
        setScore(newScore);
        setCounter(newCount);
    setQuestions(riskQuestions[newCount]);
    }
}

   useEffect(() => {
       setQuestions(riskQuestions[0])
    let timer;
    timer =  setInterval(() => {
        if(timeOutCount === 10) {
            setQuestinDisplay({display:""}) 
            return clearInterval();
        }else{
            const newCount = timeOutCount + 1;
            setTimeOutCount(newCount);
        }
    }, 1000);
     return () => clearInterval(timer);

  }, [timeOutCount]);
   
    return (
        <div className="">
            <div className="col-12 col-sm-12 col-md-12">
                <div className={`card opacity-9 fixed b-medik`}>
                </div>
            </div>
            <div className={`col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed top-margin-sm`}>
                <main className="opacity">
                    <div className="row align-center">
                        <div className="col-12 col-sm-12 col-md-12">
                            <section className={` text-white ${display.display}`}>
                               <div className="row">
                                   <div className="col-12">
                                    <h5>Note!</h5>
                                    <h5>This app do not replace COVID-19 diagnosis in anyway.</h5>
                                    <h5>It is a risk caculator that give advice on you calling the diease control hotline or not.</h5>
                                   <h5>COVID-19 risk assessment checker please hold your breath for 10 sec</h5>
                                    <h1 className="text-center">{timeOutCount}</h1>
                                   </div>
                               </div>
                            </section>
                            <RiskAssessment  clickedNo={event=>no(event)} clickedYes={event=>yes(event, ask.point)} displayQuestions={questionDisplay.display} askQuestion={ask.question} askpoint={ask.point}/>
                            <RiskCaculator riskColor={riskColor} displayResultLow={resultRisk.low} displayResultHigh={resultRisk.high} displayResultMedium={resultRisk.medium}  displayRisk={result}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Risk;