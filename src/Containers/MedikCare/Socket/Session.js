
    const sessionItemUser = JSON.parse(sessionStorage.getItem("user"));
    const sessionItemDoctor = JSON.parse(sessionStorage.getItem("doctor"));
    let userSession;
        if(sessionItemDoctor === null && sessionItemUser === null) {
            window.location ="/not-found"
        }else if(sessionItemUser === null && sessionItemDoctor !== null){
            userSession = sessionItemDoctor;
            userSession.isDoctorActive = true; 
        }else if(sessionItemUser !== null && sessionItemDoctor === null) {
            userSession = sessionItemUser;
            userSession.isUserActive = true;
        }

        export let session = userSession;