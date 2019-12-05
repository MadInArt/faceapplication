import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'
const Logo = () => {
	return(
		<Tilt className="Tilt br2 shadow-2 ma3" options={{ max : 25 }} style={{ height: 120, width: 120 }} >
			 <div className="Tilt-inner"><img style={{paddingTop:12}}  alt='brain' src ={brain}/></div>
		</Tilt>
		)
}

export default Logo;