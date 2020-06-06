import React from 'react';
import vid from '../Assets/videos/medikcarevid.mp4'

const MedikVideo = (props) => {
  return (
    <section className="b-medik">
    	<div className="container">
    		<div className="row">
    			<div className="col-12 col-sm-12 col-md-5 home-content">
    				<h1 className="medik-color-secondary">Why Choose Medik Care?</h1>
    				<p className="medik-color-secondary"><i className="square card"></i>Consult With Qualified Doctors.</p>
    				<p className="medik-color-secondary"><i className="square card"></i>Affordable payment plan.</p>
    				<p className="medik-color-secondary"><i className="square card"></i>No Waiting Time.</p>
    				<p className="medik-color-secondary"><i className="square card"></i>Responsible Customer Care.</p>
    			</div>
    			<div className="col-12 col-sm-12 col-md-7">
    				<div>
    				    <video className="card" width="100%" height="70%" controls autoPlay={true}>
						  <source src={vid} type="video/mp4" />
						  <source src={vid} type="video/ogg" />
						  Your browser does not support the video tag.
						</video>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
  )
}

export default MedikVideo;