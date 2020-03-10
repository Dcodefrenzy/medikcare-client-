import React from 'react';
import Home from './MedikWeb/Home';
import NavBar from './MedikWeb/NavBar/NavBar';
import MedikVideo from './MedikWeb/MedikVideo';
import Services from './MedikWeb/Services';
import GetStarted from './MedikWeb/GetStarted';
import Milestones from './MedikWeb/Milestones';
import Footer from './MedikWeb/Footer';
import SideBar from './MedikWeb/NavBar/SideBar';

const MedikHome = (props) => {
  return (
    <div>
        <NavBar />
        <SideBar />
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