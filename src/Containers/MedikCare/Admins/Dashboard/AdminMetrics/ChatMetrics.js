import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";

const ChatMetrics = () => {

  const sessionItem = JSON.parse(sessionStorage.getItem("admin"));
  const [userGrowths, setuserGrowths] = useState([]);
  const [adsMetrics, setAdsMetrics] = useState([]);
  


 const setMetricHandler = ()=>{
     const url = "/api/v1/admins/ads-metrics";
      fetch(url, {
          method:"GET",
          headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
      })
      .then(res => res.json())
      .then(response => {
          if (response.status === 200) {
           // console.log(response)
            setAdsMetrics(response.message);
          }else{
            setAdsMetrics({userMetric:0,doctorMetric:0,adsMetric:0,questionMetric:0,answerMetric:0});
              //console.log(response)
          }
      })
  }
  const setUserGrowthHandler = ()=>{
    const url = "/api/v1/admins/growth-metrics";
     fetch(url, {
         method:"GET",
         headers: {'Content-Type': "application/json", "x-auth": sessionItem.token}
     })
     .then(res => res.json())
     .then(response => {
         if (response.status === 200) {
          //console.log(response.users)
           setuserGrowths(response.users);
         }
     })
 }

  useEffect(()=>{
      setMetricHandler();
      setUserGrowthHandler();
  },[])


 const twiter = adsMetrics.filter(ads => ads.socialMedia === 1)
 const facebook = adsMetrics.filter(ads => ads.socialMedia === 2)
 const instagram = adsMetrics.filter(ads => ads.socialMedia === 3)
 const google = adsMetrics.filter(ads => ads.socialMedia === 4)
 const friends = adsMetrics.filter(ads => ads.socialMedia === 5)
 const whatapp = adsMetrics.filter(ads => ads.socialMedia === 6)
 //for user growth chart
 //const u =userGrowths.map(user=>new Date(user.dateCreated).getUTCMonth());
 let jan = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 0)
 const feb = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 1)
 const mar = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 2)
 const apr = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 3)
 const may = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 4)
 const jun = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 5)
 const jul = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 6)
 const aug = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 7)
 const sept = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 8)
 const oct = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 9)
 const nov = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 10)
 const dec = userGrowths.filter(user=>new Date(user.dateCreated).getMonth() === 11)
//console.log(u)

    return (

       <div className="top-margin-lg">
         <h1 className="text-center">User Metrics</h1>
          <div className="row justify-content-center metric-card ">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <Chart
  width={'500px'}
  height={'400px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Twitter', twiter.length],
    ['Facebook', facebook.length],
    ['Instagram', instagram.length],
    ['Google', google.length],
    ['Friends', friends.length],
    ['WhatsApp', whatapp.length],
  ]}
  options={{
    title: 'My Daily Activities',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <Chart
  width={'500px'}
  height={'400px'}
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['x', 'User Growth'],
    ['Jan', jan.length],
    ["Feb", feb.length],


  ]}
  options={{
    hAxis: {
      title: 'Year 2020',
    },
    vAxis: {
      title: 'No of Users',
    },
  }}
  rootProps={{ 'data-testid': '1' }}
/>
            </div>
        </div>
       </div>
    )
}

export default ChatMetrics;
