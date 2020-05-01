import io from 'socket.io-client';
let port ="";
if (process.env.NODE_ENV !== 'production') {
     port =  "http://localhost:7979"
  }else if(process.env.NODE_ENV === 'production'){
        port =    "";
  }

  
  export  const socket = io(port, {transports: ['websocket']});

