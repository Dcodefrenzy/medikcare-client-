import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './MedikWeb/Home';
import NavBar from './NavBar/NavBar';
import MedikVideo from './MedikWeb/MedikVideo';
import Services from './MedikWeb/Services';
import GetStarted from './MedikWeb/GetStarted';
import Milestones from './MedikWeb/Milestones';
import Footer from './MedikWeb/Footer';

const MedikHome = (props) => {
  return (
    <div>
        <NavBar />
    	<Home />
    	<MedikVideo />
    	<Services />
    	<GetStarted />
    	<Milestones />
      <Footer />
    </div>
  )
}

export default MedikHome;