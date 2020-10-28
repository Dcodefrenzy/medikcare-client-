import React, {useState, useEffect, useRef} from "react" ;
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import {socket} from '../Socket/Socket';
import ChatFormImage from "./ChatFormImage";
 
const ChatForm =(props)=>{
 
    let sess, who;
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    const [userDetail,setUserDetail] = useState({});
    const [typingUser, setTypingUser] = useState({value:""})
    const [message, setMessage] = useState({messageState:false});
    const [room, setRoomSession] = useState(null);
    const [imageForm, setImageForm] = useState({"display":"display-none"});


    const textElement = useRef(null);

    if (sessionItemUser === null && sessionItemDoctor !== null) {
        sess = sessionItemDoctor;
        who = "doctor"
  }else if (sessionItemUser !== null && sessionItemDoctor === null) {
       sess = sessionItemUser;
       who="user"
 }
    const submitChatMessage=(event)=>{
        event.preventDefault();
        let messageData ={};
        messageData = {"message":textElement.current.value, "from":sess._id, "to":props.to, "room":room,messageState:true,"image":false};
        textElement.current.value = "";
         socket.emit("send message", messageData);
         setMessage({messageData})
    }

    const imageFormDisplay = (event)=>{
        event.preventDefault();
        setImageForm({"display":"container-fluid"})
    }
    const hideImage = (event)=>{
        event.persist();
        setImageForm({"display":"display-none"})

    }

    const whoIsTyping = (event) =>{
        socket.emit('typing', room);

        socket.on('typing', (message)=>{
            setTypingUser({value:props.name+" "+message})
        })
    }
    const notTyping=(event)=>{
        socket.emit('not typing', room);

        socket.on('not typing', message=>{
            setTypingUser({value:""})
        })
    }


    useEffect(()=>{
        socket.emit("validate session", {from:sess._id, to:props.to}); 
        socket.on("validate session", (session)=>{     
            setRoomSession(session._id);
        })
    }, []);




    return(
                                <div className="card b-medik position-fixed  chat-static-buttom">
                                    <ChatFormImage who={who} token={sess.token} room={room} from={sess._id} to={props.to} display={imageForm.display} hideImageForm={event => hideImage(event)}/>
                                   <div className="card-body">
                                        <i className="text-white">{typingUser.value}</i>
                                        <form onSubmit={submitChatMessage}>
                                            <div className="row">
                                                <div className="col-6 col-sm-7 col-md-7">
                                                    <div className="form-group"> 
                                                        <textarea onChange={event => whoIsTyping(event)} onKeyUp={event=>notTyping(event)} name="chat"  ref={textElement} className="form-control chat-message" placeholder="Message" rows="1" required></textarea>
                                                        
                                                    </div>
                                                </div>
                                                <div className="col-2 col-sm-1 col-md-1">
                                                    <i onClick={event => imageFormDisplay(event)} className="fas fa-camera fa-3x text-white"></i>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-4">
                                                    <input  type="submit" className="form-contol btn btn-lg btn-dark" value="Send" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                   
    )
}

export default ChatForm;