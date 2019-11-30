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



 class App extends Component {
	
	  displayNotification = ()=> {
		if (Notification.permission == 'granted') {
		  navigator.serviceWorker.getRegistration().then(function(reg) {
			var options = {
				body: 'First notification!',
				actions: [
				  {action: 'explore', title: 'Go to the site', icon: 'img/check.png'},
				  {action: 'close', title: 'No thank you', icon: 'img/x.png'},
				]
			  };
			  
			  var text = 'HEY! Your task is now overdue.';
			reg.showNotification(text, options);
		  });
		}
	  }

	componentDidMount() {
		Notification.requestPermission(function(status) {
			console.log('Notification permission status:', status);
		});
		this.displayNotification();
	}
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

						<Route path="/doctor/registration" exact component={DoctorsRegistrationValidation} />
						<Route path="/doctor/login" exaxt component={DoctorLoginValidation} />
						<Route path="/doctor/verification" exact component={DoctorsVerification} />
						<Route path="/doctor/verification/verify/:id" exact component={DoctorVerificationSuccess} />
						<Route path="/doctor/dashboard" exact component={DoctorDashboard} />
						
						<Route path="/admin/dashboard" exact component={AdminDashboard} />
						<Route path="/admin/register" exact component={AdminRegister} />
						<Route path="/admin/login" exact component={AdminLogin} />
						<Route path="/admin/admins" exact component={AdminList} />
						<Route path="/admin/users" exact component={UsersListTh} />
						<Route path="/admin/doctors" exact component={DoctorsListTh} />
						<Route path="/admin/password/change" exact component={UpdatePassword} />
						<Route path="/admin/Profile" exact component={adminProfile} />
						<Route path="/image/update" exact component={updateImage} />
						
						<Route path="/health/questions" exact component={HealthQuestions} />
						<Route path="/health/questions/answers/:id" exact component={HealthQuestionAnswersClass} />

						<Route path="/chat" exact component={Chat} />
						<Route path="/chat/dashboard" exact component={ChatDashboard} />

						<Route path="/page-not-found" exact component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}



export default App;