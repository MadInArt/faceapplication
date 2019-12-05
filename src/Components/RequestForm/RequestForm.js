import React from 'react';
import  './RequestForm.css';

const RequestForm = ({onInputChange, onButtonClick}) => {
	return(
		<div>
			<p>Give the link to an image, and this brain will magically detect faces on it</p>
		<div className='center pa4 br3 shadow-5'>
			<input type='text' className='f4 pa2 w-70 center'onChange={onInputChange}/>
			<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick ={onButtonClick}>Submit</button>
		</div>
		</div>
		)
}

export default RequestForm;