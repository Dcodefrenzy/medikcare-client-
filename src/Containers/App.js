import React, { Component} from 'react';
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
import AdminProfile from './MedikCare/Admins/Profile/Profile';
import UpdateImage from './MedikCare/Admins/Profile/UpdateImage';
import UserProfile from './MedikCare/Users/Profile/Profile';
import UpdateUserImage from './MedikCare/Users/Profile/UpdateImage';
import UpdateDoctorImage from './MedikCare/Medicals/Doctors/Profile/UpdateImage';
import DoctorProfile from './MedikCare/Medicals/Doctors/Profile/Profile';
import UpdateAnnualPracticingLicence from './MedikCare/Medicals/Doctors/Profile/licence';
import ChatSession from './MedikCare/Chat/ChatDashboard/ChatSession';
import MainActivity from './MedikCare/Users/Activities/MainActivity';
import ChatCurrentsession from './MedikCare/Chat/ChatDashboard/ChatCurrentSession';
import ChatDashbordActivities from './MedikCare/Chat/ChatDashboard/ChatDashBoardActivities';
import AdminForgetPassword from './MedikCare/Admins/Password/ForgetPassword';
import AdminNewPassword from './MedikCare/Admins/Password/NewPassword';
import UserForgetPassword from './MedikCare/Users/Password/ForgetPassword';
import UserUpdatePassword from './MedikCare/Users/Password/UpdatePassword';
import UserNewPassword from './MedikCare/Users/Password/NewPassword';
import DoctorForgetPassword from './MedikCare/Medicals/Doctors/Password/ForgetPassword';
import DoctorNewPassword from './MedikCare/Medicals/Doctors/Password/NewPassword';
import DoctorUpdatePassword from './MedikCare/Medicals/Doctors/Password/UpdatePassword';
import UserSettings from './MedikCare/Users/Settings/Settings';
import DoctorSettings from './MedikCare/Medicals/Doctors/Settings/Settings';
import ChatDashbordNewChatDoctor from './MedikCare/Chat/ChatDashboard/ChatDashbordNewChatDoctor';
import ChatFeedbackUser from './MedikCare/Chat/ChatDashboard/ChatFeedbackUser';
import ChatReportDoctor from './MedikCare/Chat/ChatDashboard/ChatReportDoctor';
import UserReports from './MedikCare/Users/Reports/UserReports';
import AdminBlog from './MedikCare/Admins/Blog/Blog';
import AdminAddBlog from './MedikCare/Admins/Blog/AddBlog';
import AdminBlogView from './MedikCare/Admins/Blog/BlogView';
import Blog from './MedikCare/Blog/Blogs';
import BlogPost from './MedikCare/Blog/BlogPost';
import AdminAddMail from './MedikCare/Admins/Mailer/Mail';
import AdminUpdateMail from './MedikCare/Admins/Mailer/MailView';
import AdminMailer from './MedikCare/Admins/Mailer/Mails';
import UserReport from './MedikCare/Users/Reports/UserReport';
import Risk from './MedikCare/Covid19/Risk';
import HealthDoctorQuestionAnswersClass from './MedikCare/Health/HealthQuestionAnswers/HealthDoctorQuestionAnswerClass';
import ChatCreateSession from './MedikCare/Chat/ChatDashboard/ChatCreateSession';
import ChatUserProfile from './MedikCare/Chat/ChatUserProfile';
import ChatDoctorProfile from './MedikCare/Chat/ChatDoctorProfile';
import AdminChatSession from './MedikCare/Admins/Sessions/ChatSessions';
import ChatWaitingList from './MedikCare/Chat/ChatDashboard/ChatWaitingList';
import ChatOngoingSessions from './MedikCare/Chat/ChatDashboard/ChatOngoingSessions';
import ChatEndSession from './MedikCare/Chat/ChatDashboard/ChatEndSession';



 class App extends Component {
 

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/" exact component={ MedikHome } />
						<Route path="/index" exact component={ MedikHome } />
						<Route path="/home" exact component={ MedikHome } />
						<Route path="/blog" exact component={ Blog } />
						<Route path="/blog/:id" exact component={ BlogPost } />
						<Route path="/registration" exact component={RegistrationValidation}/>
						<Route path="/login" exact component={UserLogin} />
						<Route path="/user/dashboard" exact component={UserDashboard} />
						<Route path="/user/verification" exact component={Verification} />
						<Route path="/user/verification/verify/:id" exact component={VerificationSuccess} />
						<Route path="/user/question" exact component={Question} />
						<Route path="/user/profile" exact component={UserProfile} />
						<Route path="/user/image/update" exact component={UpdateUserImage} />
						<Route path="/user/main-activity" exact component={MainActivity} />
						<Route path="/user/password/change" exact component={UserUpdatePassword} />
						<Route path="/user/forget/password" exact component={UserForgetPassword} />
						<Route path="/user/forget-password/:id" exact component={UserNewPassword} />
						<Route path="/user/settings" exact component={UserSettings} />
						<Route path="/user/reports" exact component={UserReports} />
						<Route path="/user/report/:id" exact component={UserReport} />
						
						

						<Route path="/doctor/registration" exact component={DoctorsRegistrationValidation} />
						<Route path="/doctor/login" exaxt component={DoctorLoginValidation} />
						<Route path="/doctor/verification" exact component={DoctorsVerification} />
						<Route path="/doctor/verification/verify/:id" exact component={DoctorVerificationSuccess} />
						<Route path="/doctor/dashboard" exact component={DoctorDashboard} />
						<Route path="/doctor/profile" exact component={DoctorProfile} />
						<Route path="/doctor/image/update" exact component={UpdateDoctorImage} />
						<Route path="/doctor/upload/annual-practicing-licence/file" exact component={UpdateAnnualPracticingLicence} />
						<Route path="/doctor/password/change" exact component={DoctorUpdatePassword} />
						<Route path="/doctor/forget/password" exact component={DoctorForgetPassword} />
						<Route path="/doctor/forget-password/:id" exact component={DoctorNewPassword} />
						<Route path="/doctor/settings" exact component={DoctorSettings} />	
						<Route path="/doctor/sessions/waiting" exact component={ChatWaitingList} />	
						<Route path="/doctor/sessions/ongoing" exact component={ChatOngoingSessions} />	
										
						
						

						<Route path="/admin/dashboard" exact component={AdminDashboard} />
						<Route path="/admin/register" exact component={AdminRegister} />
						<Route path="/admin/login" exact component={AdminLogin} />
						<Route path="/admin/admins" exact component={AdminList} />
						<Route path="/admin/users" exact component={UsersListTh} />
						<Route path="/admin/doctors" exact component={DoctorsListTh} />
						<Route path="/admin/password/change" exact component={UpdatePassword} />
						
						<Route path="/admin/Profile" exact component={AdminProfile} />
						<Route path="/admin/image/update" exact component={UpdateImage} />
						<Route path="/admin/forget/password" exact component={AdminForgetPassword} />
						<Route path="/admin/forget-password/:id" exact component={AdminNewPassword} />
						<Route path="/admin/blog" exact component={AdminBlog} />
						<Route path="/admin/blog/add" exact component={AdminAddBlog} />
						<Route path="/admin/blog/:id" exact component={AdminBlogView} />
						<Route path="/admin/mail/add" exact component={AdminAddMail} />
						<Route path="/admin/mail/:id" exact component={AdminUpdateMail} />
						<Route path="/admin/mail" exact component={AdminMailer} />
						<Route path="/admin/chat/sessions" exact component={AdminChatSession} />
						
						
	
						
						
						<Route path="/health/questions" exact component={HealthQuestions} />
						<Route path="/health/questions/answers/:id" exact component={HealthQuestionAnswersClass} />
						<Route path="/doctor/health/questions/answers/:id" exact component={HealthDoctorQuestionAnswersClass} />
						
						<Route path="/covid-19/risk/assessment"exact  component={Risk}/>
						

					
						<Route path="/chat/dashboard" exact component={ChatDashboard} />
						<Route path="/chat/doctors" exact component={ChatCreateSession} />
						<Route path="/chat/user/profile/:id" exact component={ChatUserProfile} />
						<Route path="/chat/doctor/profile/:id" exact component={ChatDoctorProfile} />
						<Route path="/chat/end/:id" extract component={ChatEndSession} />
						<Route path="/chat/notifications" exact component={ChatDashbordActivities} />
						<Route path="/chat/:id" exact component={Chat} />
						<Route path="/chat/session/:id" exact component={ChatSession} />
						<Route path="/chat/current/session/:id" exact component={ChatCurrentsession} />
						<Route path="/chat/doctors/doctor" exact component={ChatDashbordNewChatDoctor} />
						<Route path="/chat/feedback/:id" exact  component={ChatFeedbackUser} />
						<Route path="/chat/report/:id" exact component={ChatReportDoctor} />
						
						

						<Route path="/page-not-found" exact component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}



export default App;