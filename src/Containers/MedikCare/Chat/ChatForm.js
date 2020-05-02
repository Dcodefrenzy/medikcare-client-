import React, { useState, useEffect, useContext } from 'react';



const ChatForm = (props) =>{
    const [form, setForm] = useState({value:""});
    let messageValue;
    const setFormHandller =(event)=>{
    setForm({value:event.target.value});    
   }
    return(
    <form onSubmit={event => props.messageDisplay(event)} value={form.value}>
        <div className="row">
           <div className="col-8">
                <div className="form-group"> 
                    <textarea name="chat" onChange={event =>setFormHandller(event)}  value={form.value} className="form-control chat-message" placeholder="Write a message" rows="1" required></textarea>
                    </div>
                </div>
            <div className="col-4">
                <input type="submit" className="form-contol btn btn-lg btn-dark" value="Send" />
            </div>
       </div>
    </form> 
    )
}

export default ChatForm;