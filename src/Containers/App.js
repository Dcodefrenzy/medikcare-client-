import React, { Component} from 'react';
import './App.css';
import MedikHome from './MedikCare/MedikHome';
import UserRegister from './MedikCare/Users/Logins/Registration'
import UserLogin from './MedikCare/Users/Logins/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


 class App extends Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/" exact component={ MedikHome } />
						<Route path="/index" exact component={ MedikHome } />
						<Route path="/home" exact component={ MedikHome } />
						<Route path="/registration" exact component={UserRegister}/>
						<Route path="/login" exact component={UserLogin} />
					</Switch>
				</div>
			</Router>
		);
	}
}



export default App;