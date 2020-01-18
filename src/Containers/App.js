import React, { Component} from 'react';
import './App.css';
import MedikHome from './MedikCare/MedikHome';
import UserLogin from './MedikCare/Users/Logins/LoginValidation'
import AdminDashboard from'./MedikCare/Admins/AdminDashboard'
import AdminLogin from'./MedikCare/Admins/AdminRegister/Login'
import AdminList from'./MedikCare/Admins/AdminList/AdminList'
import AdminRegister from'./MedikCare/Admins/AdminRegister/Registration'
import NotFound from './MedikCare/NotFound/NotFound';
import RegistrationValidation from './MedikCare/Users/Logins/RegistrationValidation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDashboard from './MedikCare/Users/UserDashboard/Dashboard';
import Verification from './MedikCare/Users/Verification/Verification';
import VerificationSuccess from './MedikCare/Users/Verification/VerificationSuccess';
import Question from './MedikCare/Users/HealthQuestions/Question';
import HealthQuestions from './MedikCare/Health/HealthQuestions/HealthQuestions';
import HealthQuestionAnswersClass from './MedikCare/Health/HealthQuestionAnswers/HealthQuestionAnswersClass';
import DoctorsRegistrationValidation from './MedikCare/Medicals/Doctors/DoctorsLogins/DoctorsRegistrationValidation';
import DoctorsVerification from './MedikCare/Medicals/Doctors/Verification/Verification';
import DoctorVerificationSuccess from './MedikCare/Medicals/Doctors/Verification/VerificationSuccess';
import DoctorLoginValidation from './MedikCare/Medicals/Doctors/DoctorsLogins/DoctorsLoginValidation';
import DoctorDashboard from './MedikCare/Medicals/Doctors/DoctorsDashboard/Dashboard';
import Chat from './MedikCare/Chat/Chat';
import ChatDashboard from './MedikCare/Chat/ChatDashboard/ChatDashboard';
import UsersListTh from './MedikCare/Admins/UsersList/UsersDetails/UsersTh';
import DoctorsListTh from './MedikCare/Admins/DoctorsList/DoctorsList';
import UpdatePassword from './MedikCare/Admins/Password/UpdatePassword';
import adminProfile from './MedikCare/Admins/Profile/Profile';
import updateImage from './MedikCare/Admins/Profile/UpdateImage';
import userProfile from './MedikCare/Users/Profile/Profile';
import updateUserImage from './MedikCare/Users/Profile/UpdateImage';
import updateDoctorImage from './MedikCare/Medicals/Doctors/Profile/UpdateImage';
import doctorProfile from './MedikCare/Medicals/Doctors/Profile/Profile';
import updateAnnualPracticingLicence from './MedikCare/Medicals/Doctors/Profile/licence';
import ChatSession from './MedikCare/Chat/ChatDashboard/ChatSession';
import mainActivity from './MedikCare/Users/Activities/MainActivity';
import chatCurrentsession from './MedikCare/Chat/ChatDashboard/ChatCurrentSession';
import ChatDashbordActivities from './MedikCare/Chat/ChatDashboard/ChatDashBoardActivities';
import ChatDashbordNewChat from './MedikCare/Chat/ChatDashboard/ChatDashbordNewChat';
import AdminForgetPassword from './MedikCare/Admins/Password/ForgetPassword';
import AdminNewPassword from './MedikCare/Admins/Password/NewPassword';



 class App extends Component {
	
	  displayNotification = ()=> {
		if (Notification.permission == 'granted') {
		  navigator.serviceWorker.getRegistration().then(function(reg) {
			var options = {
				body: 'First notification!',
				actions: [
				  {action: 'explore', title: 'Go to the site', icon: 'img/check.png'},
				  {action: 'close', title: 'No thank you', icon: 'MedikImage/MED2.png'},
				]
			  };
			  
			  var text = {task:'HEY! Your task is now overdue.',icon: 'MedikImage/MED2.png'};
			reg.showNotification(text, options);
		  });
		}
	  }

	componentDidMount() {
		Notification.requestPermission(function(status) {
			console.log('Notification permission status:', status);
		});
		if (Notification.permission === 'granted') {
			console.log("granted already.")
		}else{
			this.displayNotification();
		}	
	}

	/*	componentDidMount() {
		Notification.requestPermission(function(status) {
			console.log('Notification permission status:', status);
		});
		if (Notification.permission === 'granted') {
			console.log("granted already.")
		}else{
			this.displayNotification();
		}	
	}*/
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/" exact component={ MedikHome } />
						<Route path="/index" exact component={ MedikHome } />
						<Route path="/home" exact component={ MedikHome } />
						<Route path="/registration" exact component={RegistrationValidation}/>
						<Route path="/login" exact component={UserLogin} />
						<Route path="/user/dashboard" exact component={UserDashboard} />
						<Route path="/user/verification" exact component={Verification} />
						<Route path="/user/verification/verify/:id" exact component={VerificationSuccess} />
						<Route path="/user/question" exact component={Question} />
						<Route path="/user/profile" exact component={userProfile} />
						<Route path="/user/image/update" exact component={updateUserImage} />
						<Route path="/user/main-activity" exact component={mainActivity} />

						<Route path="/doctor/registration" exact component={DoctorsRegistrationValidation} />
						<Route path="/doctor/login" exaxt component={DoctorLoginValidation} />
						<Route path="/doctor/verification" exact component={DoctorsVerification} />
						<Route path="/doctor/verification/verify/:id" exact component={DoctorVerificationSuccess} />
						<Route path="/doctor/dashboard" exact component={DoctorDashboard} />
						<Route path="/doctor/profile" exact component={doctorProfile} />
						<Route path="/doctor/image/update" exact component={updateDoctorImage} />
						<Route path="/doctor/upload/annual-practicing-licence/file" exact component={updateAnnualPracticingLicence} />
						
						<Route path="/admin/dashboard" exact component={AdminDashboard} />
						<Route path="/admin/register" exact component={AdminRegister} />
						<Route path="/admin/login" exact component={AdminLogin} />
						<Route path="/admin/admins" exact component={AdminList} />
						<Route path="/admin/users" exact component={UsersListTh} />
						<Route path="/admin/doctors" exact component={DoctorsListTh} />
						<Route path="/admin/password/change" exact component={UpdatePassword} />
						<Route path="/admin/Profile" exact component={adminProfile} />
						<Route path="/admin/image/update" exact component={updateImage} />
						<Route path="/admin/forget/password" exact component={AdminForgetPassword} />
						<Route path="/admin/forget-password/:id" exact component={AdminNewPassword} />
						
						
						
						
						<Route path="/health/questions" exact component={HealthQuestions} />
						<Route path="/health/questions/answers/:id" exact component={HealthQuestionAnswersClass} />

					
						<Route path="/chat/dashboard" exact component={ChatDashboard} />
						<Route path="/chat/doctors" exact component={ChatDashbordNewChat} />
						<Route path="/chat/notifications" exact component={ChatDashbordActivities} />
						<Route path="/chat/:id" exact component={Chat} />
						<Route path="/chat/session/:id" exact component={ChatSession} />
						<Route path="/chat/current/session/:id" exact component={chatCurrentsession} />
						
						

						<Route path="/page-not-found" exact component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}



export default App;