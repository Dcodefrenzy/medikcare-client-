import React, {useState, useEffect, useRef} from "react" ;
import Peer from "simple-peer";
import { socket } from "../Socket/Socket";
import { Beforeunload } from 'react-beforeunload';
import LoginSession from "../Users/Logins/LoginSession";
import DoctorLoginSession from "../Medicals/Doctors/DoctorsLogins/LoginSession";

const ChatVideo = (props)=>{
    const to  = props.match.params.id;
    const sessionId  = props.match.params.sessionId;
    const [popup, setPopup] = useState("display-none");
    const [yourStream, setYourStream] = useState({"stream":null});
    
    const [doctorSession, setDoctorSession] = useState({display:"display-none"});
    const [loginSession, setLoginSession] = useState({display:"display-none"});
    
    const yourVideo = useRef();
    const partnerVideo = useRef();
    const peers = useRef([]);
    const oldPeer = useRef();
 
    let dashboardLink;
    let userUrl;
    let sess;
    let msg = "";
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    
    if (sessionItemUser === null && sessionItemDoctor !== null) {
        dashboardLink ="/chat/doctors/doctor";
        userUrl = "/api/v1/doctor/find-user/"+to;
        sess = sessionItemDoctor;
    }else if (sessionItemUser !== null && sessionItemDoctor === null) {
       dashboardLink ="/chat/doctors";
       userUrl = "/api/v1/user/find-doctor/"+to;
       sess = sessionItemUser;
    }


    const joinSession = async(event)=>{
        event.preventDefault();
        setPopup("display-none");
        const cameras = await getConnectedDevices('videoinput');
        console.log(cameras.length)
        if (cameras && cameras.length > 0) {
            // Open first available video camera with a resolution of 1280x720 pixels
            const stream = await openCamera(cameras[0].deviceId, 640, 480);
            setYourStream({'stream':stream});
            yourVideo.current.srcObject = stream;
            makeCall(stream, sess._id, to)
        }
    }



    async function getConnectedDevices(type) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === type)
    }
    
    // Open camera with at least minWidth and minHeight capabilities
    async function openCamera(cameraId, minWidth, minHeight) {
        const constraints = {
            'audio': {'echoCancellation': true},
            'video': {
                'deviceId': cameraId,
                }
            }
    
        return await navigator.mediaDevices.getUserMedia(constraints);
    }


    const makeCall =(stream, from, to)=>{
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream:stream
        });

        peers.current.push({"id":from,"stream":stream,"peer":peer, "to":to});
        peer.on("signal", data=>{
            socket.emit("makecall", {from:from, signal:data, to:to})
        })
        peer.on("stream", signal=>{
                partnerVideo.current.srcObject = signal;
        })
        socket.on("getStream", (roomSession, chatData)=>{
            sessionStorage.setItem("chatSession", JSON.stringify({room:roomSession}));
            returnCall(roomSession, chatData);
            
        });
        socket.on("reconnection", (roomSession, chatData)=>{
            sessionStorage.setItem("chatSession", JSON.stringify({room:roomSession}));
            
            peer.signal(chatData.signal);
        });
        peer.on('error', e=>{
            console.log(e)
            peers.current.map((peer)=>{
                if (peer.to === to) {
                    peer.peer.destroy();
                }
            })

            //partnerVideo.current.srcObject = stream;
            //yourVideo.current.srcObject = null;
        })
        
    }

    
    const returnCall =(session,chatData)=>{
      const stream =  peers.current.map((peer)=>{
            if (session.from === sess._id) {
                return peer.stream;
            }else if (session.to === sess._id) {
                return peer.stream;
            }
        })
        console.log(stream)
        const peer = new Peer({
            initiator:false,
            trickle:false,
            stream:stream[0]
        });
        peers.current.push({"id":sess._id,"stream":stream,"peer":peer, "to":to})
        peer.on("signal", data=>{
            socket.emit("reconect", {from:sess._id, signal:data, to:to})
        })
        peer.on("stream", signal=>{
                partnerVideo.current.srcObject = signal;       
   
        })        
            peer.signal(chatData.signal);
        peer.on('error', e=>{
            console.log(e)
            peers.current.map((peer)=>{
                if (peer.to === to) {
                    peer.peer.destroy();
                }
            })
            //partnerVideo.current.srcObject = stream;
            //yourVideo.current.srcObject = null;
        })
        
    }
    const onUnload=(event)=>{
        event.addEventListener();
        return "Changes you made may not be saved";
    }

    useEffect(()=>{
        joinSession(event);
    }, [])



    return (
        <div className="container-fluid">
            
            <LoginSession display={loginSession.display} /> 
            <DoctorLoginSession display={doctorSession.display} />
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div className="partner-video">
                        <video  className="partner-video-height" ref={partnerVideo}   autoPlay playsInline controls={false}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div className="your-video  row">
                        <main className="col-10 col-sm-10 col-md-10 col-lg-10">
                            <i className="fa fa-arrow-left text-white"></i>
                        </main>
                        <main className="col-2 col-sm-2 col-md-2 col-lg-2">
                            <div className="dropdown dropleft">
                                        <i className="fa fa-ellipsis-v  fa-3x text-white" aria-hidden="true" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></i>
                                            <div className="dropdown-menu">
                                                <div> <span  className="dropdown-item" href="#">profile</span></div>
                                                <div className="dropdown-divider"></div>
                                                <div><a className="dropdown-item" href="#">Report</a></div>
                                                <div><a className="dropdown-item" href="#">End Session</a></div>
                                                <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Back</a>
                                        </div>
                                    </div>
                            </main>
                        </div>
                    </div>
                        <div className="your-video-fixed row"> 
                            <main className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <video  className="your-video-display float-left" ref={yourVideo} muted autoPlay playsInline controls={false}/>
                        </main>
                        </div>
                        <div className="video-fixed">
                            <div className="row justify-content-center ml-2">    
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <i className='fas fa-camera fa-2x'></i>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <i className='fas fa-video-slash fa-2x'></i>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                <i className="fas fa-comment-dots  fa-3x text-white" aria-hidden="true" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></i>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className={popup}>            
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card opacity fixed b-medik">
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 fixed mt-5">
                        <main className="card top-margin-md">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 top-margin-md">
                                        <h3>Video Chat Consultation</h3>
                                    </div>
                                    <div className="col-12 top-margin-md">
                                        <h5>Please click the button below to join the video chat consultation. </h5>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 offset-md-3 top-margin-sm">   
                                        <h5 onClick={event => joinSession(event)}  className="card-body btn-medik text-center">Join video Session</h5>
                                    </div>
                                </div>
                            </div>
                        </main>
                </div>
            </div>
            
        <Beforeunload onBeforeunload={(event) => "You'll lose your data!"} />
        </div>
    )





}

export default ChatVideo; 