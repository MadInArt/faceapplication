import React from 'react';
import  './RequestForm.css';

const RequestForm = ({onInputChange, onButtonClick}) => {
	return(
		<div>
			<p>This brain magically detect faces on your image</p>
		<div className='center pa4 br3 shadow-5'>
			<input type='text' className='f4 pa2 w-70 center'onChange={onInputChange}/>
			<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick ={onButtonClick}>Submit</button>
		</div>
		</div>
		)
}

export default RequestForm;