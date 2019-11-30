import React, {useState, useEffect, createContext} from "react" ;
import ChatDashboardNotification from "./ChatDashboardNotification";
import ChatDashbordNewChat from "./ChatDashbordNewChat";
import ChatDashbordActivities from "./ChatDashBoardActivities";
export const SessionContext = createContext();




const ChatDashboard = (props) =>{
    const [displays, setEventDisplays] = useState({notification:{display:"display-show",active:"chat-dashboard-active"},message:{display:"display-none",active:""},task:{display:"display-none",active:""}})
   const [session, setSession] = useState({});
   

    
    const setEventDisplaysHandler = (event) =>{
        switch (event.target.id) {
            case "bell":
                setEventDisplays({notification:{display:"display-show",active:"chat-dashboard-active"},message:{display:"display-none",active:""},task:{display:"display-none",active:""}});
                break;
            case "newMessage":
                setEventDisplays({notification:{display:"display-none",active:""},message:{display:"display-show",active:"chat-dashboard-active"},task:{display:"display-none",active:""}});
                break;
            case "activities":
                setEventDisplays({notification:{display:"display-none",active:""},message:{display:"display-none",active:""},task:{display:"display-show",active:"chat-dashboard-active"}});
                break;
            default:
                break;
        }
    }
    const getSession = ()=> {
        const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
        const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
        if(sessionItemDoctor === null && sessionItemUser === null) {
            window.history.back();
        }else if(sessionItemUser === null && sessionItemDoctor !== null){
            sessionItemDoctor.isUser = false;
            return sessionItemDoctor
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            sessionItemUser.isUser = true;
            return sessionItemUser
        }
    }

    return(
        <div className="container-fluid b-medik">
            <div className="container">
                <div className="row">
                    <div className="col-12 offset-0 col-sm-12 offset-sm-0 col-md-12 offset-md-0 col-lg-12 offset-lg-0">
                        <div className="card b-medik">
                            <div className="card-body">
                                <div className="card b-medik position-fixed fixed-top">
                                    <div className="card-body text-white">
                                        <div className="row justify-content-between">
                                            <div className="col-3">
                                                <i className="fa fa-arrow-left fa-lg" aria-hidden="false"> Back</i>
                                            </div>
                                            <div className="col-3">
                                                <i onClick={(event)=>setEventDisplaysHandler(event)} id="bell" className={`fa fa-bell fa-3x ${displays.notification.active}`} aria-hidden="true"></i>
                                            </div>   
                                            <div className="col-3">
                                                <i onClick={(event)=>setEventDisplaysHandler(event)} id="newMessage" className={`fa fa-plus-circle fa-3x ${displays.message.active}`}> </i>
                                            </div>
                                            <div className="col-3">
                                                <i onClick={(event)=>setEventDisplaysHandler(event)} id="activities" className={`fa fa-tasks fa-3x ${displays.task.active}`}  aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat">
                                   <section>
                                       <SessionContext.Provider value={getSession()}>
                                            <ChatDashboardNotification display={displays.notification.display} />
                                            <ChatDashbordNewChat display={displays.message.display}  />
                                            <ChatDashbordActivities display={displays.task.display} />
                                       </SessionContext.Provider>
                                   </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDashboard;