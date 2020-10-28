import React, {useState, useEffect, useRef} from "react" ;
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import {socket} from '../Socket/Socket';



const ChatFormImage = (props)=>{
    const [spinner,setSpinner] = useState("display-none");
    
    const [file, setFile]  = useState({file:""});
    const fileHandler=(event)=>{
        setFile({file:event.target.files[0]})
  
    }

    const sendImage=(event)=>{
        console.log(file)
        setSpinner("")
        event.preventDefault();
        const formData = new FormData();
        
        formData.append('image', file.file)
         const url = `/api/v1/images/${props.who}/chat`;

         fetch(url, {
             method: "POST",
             body:formData,
             headers: {"u-auth": props.token}
         })
         .then(res => res.json())
         .then(response => { console.log(response)
             if(response.status === 401) {
                 sessionStorage.removeItem("doctor");
                 window.location = "/login?Session expired please login."
             }else if (response.status === 201) {
                setSpinner("display-none")
                 console.group(response)
                let messageData ={};
                messageData = {"message":response.filename, "from":props.from, "to":props.to, "room":props.room,messageState:true,"image":true};
                 console.log(messageData);
                    socket.emit("send message", messageData);
                    props.hideImageForm(event)
 
             }
         })
        
         
    }


return( 
    <div className={props.display}>
        <div className="card  fixed b-medik pt-5">
            <main className="row mt-5">                                    
                <div className="col-12 col-sm-12 col-md-12">
                    <i onClick={props.hideImageForm}  className="fa fa-arrow-left text-white" aria-hidden="false"></i>
                </div>
                <div className="col-12 col-sm-12 col-md-12 text-white">
                    
                <h3>Update Image</h3>
                    <form encType="multipart/form-data" onSubmit={sendImage}>
                        <div className="row alert alert-success padding-sm">
                            <div className="col-12 col-sm-12 col-md-12">
                                <input className="form-control" type="file" name="image" onChange={fileHandler} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-sm-6 col-md-6">
                                <div className={spinner}>
                                    <i className="fa fa-spinner fa-pulse fa-2x"></i>
                                </div>
                                <div className="form-group">
                                    <input className="btn-medik form-control" type="submit" name="Send" value="Send" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </div>
)
}

export default ChatFormImage;