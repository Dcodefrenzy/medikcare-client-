import React from 'react';
import Metrics from './AdminMetrics/Metrics'
import ChatMetrics from './AdminMetrics/ChatMetrics';

const Dashboard = () => {
  
    return (
      <main className="col-12 col-sm-12 col-md-10  col-lg-10">
          <Metrics /> 
          <ChatMetrics />
      </main>
    )
}

export default Dashboard;