import React, {useState, useEffect, createContext} from "react" ;
import { Link } from 'react-router-dom';
import chat  from '../../Assets/svgs/Health_chat.svg'
import Article  from '../../Assets/svgs/Health_Article.svg'
import Payment  from '../../Assets/svgs/Health_Payment.svg'
import Doctor  from '../../Assets/svgs/Health_Doctor.svg'
import Time  from '../../Assets/svgs/Health_Remotely.svg'

const RegistrationGettingStarted = (props) => {
    let gettingStartedMessage = 
    [
        {"bgColor":"bg-warning","headerText":"ONLINE CONSULTATION","textMessage":"We save you the stress of going to the hospital to see doctor. You can now consult with a doctor virtually on out platform","svg":Time},
        {"bgColor":"b-medik","textColor":"text-white","headerText":"TREATMENT PLAN","textMessage":"We'll pair you with a doctor that best meets your needs, and they will give you a treatment plan and next steps to put you or your family member on the road to recovery.","svg":Doctor},
        {"bgColor":"bg-success","headerText":"PAY A TOKEN","textMessage":"We won't give you unnecessary bills, you will only pay a token of 300 naira to consult with our doctors.","svg":Payment},
        {"bgColor":"bg-chocolate","headerText":"ASK HEALTH QUESTIONS FOR FREE","textMessage":"You can ask our pool of doctors questions for free and you will get answers in 12 hours or less.","svg":Article}
    ]
    const [count, setCounter] =useState(0)
    const [display, setDisplay] =useState({display:"container"})
   const [gettingStarted, setGettingStarted] = useState({"bgColor":"bg-warning","headerText":"ONLINE CONSULTATION","textMessage":"We save you the stress of going to the hospital to see doctor. You can now consult with a doctor virtually on out platform","svg":Time});

const moveLeft = (event, count)=>{
        if(count === 0){   
        setGettingStarted(gettingStartedMessage[count]);
        }else{
            
        const newCount = count -1;        
        setGettingStarted(gettingStartedMessage[newCount]);
        setCounter(newCount)
        }

}
const moveRight = (event, count)=>{ 

    if(count === gettingStartedMessage.length-1){
        const newCount = count -1; 
        setDisplay({display:"display-none"})
        setGettingStarted(gettingStartedMessage[newCount]);
    }
    else{  
    const newCount = count + 1;        
    setGettingStarted(gettingStartedMessage[newCount]);
    setCounter(newCount)
    }

}
const hideDisplay = (event)=>{
    event.preventDefault();
    setDisplay({display:"display-none"})
}
   useEffect(() => {
    let timer;
    timer=  setInterval(() => {
        if(gettingStartedMessage.length === count){
            setDisplay({display:"display-none"})
            setCounter(gettingStartedMessage.length)
            return clearTimeout();
        }else{
            setGettingStarted(gettingStartedMessage[count])  
            console.log(count)
        setCounter(count+1)
        }
        
      }, 4000);
      return () => clearTimeout(timer);
  }, [count]);
   
    return (
        <div className={display.display}>
            <div className="col-12 col-sm-12 col-md-12">
                <div className={`card opacity-9 fixed  ${gettingStarted.bgColor}`}>
                </div>
            </div>
            <div className={`col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed`}>
                <main className="opacity">
                    <div className="row align-center">
                        <div className="col-12  col-sm-12 col-md-6 "> 
                            <img  src={gettingStarted.svg} alt="Login on medikcare platform" className="text-white home-svg"/>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 top-margin-sm">
                        <h1 className="text-dark">{gettingStarted.headerText}</h1>
                        <h5 className="text-white">{gettingStarted.textMessage}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12  col-sm-12 col-md-12 top-margin-sm">
                            <i onClick={event=>moveLeft(event, count)} className="fa fa-arrow-circle-left"></i>
                            <i onClick={event=>moveRight(event, count)} className="fa fa-arrow-circle-right float-right"></i>
                        </div>
                    </div>
                    <div className="row align-center">
                        <div className="col-12">
                        <button onClick={event=>hideDisplay(event)} className="btn btn-lg btn-dark text-white">Sign Up</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default RegistrationGettingStarted;