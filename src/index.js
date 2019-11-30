import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Containers/Styles.css';
import '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


ReactDOM.render(
  <App title="Relevant Persons" />, 
  document.getElementById('root')
); 
