import React from 'react'
import '../styles/NameForm.css'

const NameForm = (props) => {

	return (
		<div className="modal">
			<div className="modalContent">
				<h3>Add to High Scores</h3>
				<div>
					<span><input type="text" onChange={props.handleChange} placeholder="Name" value={props.name} /></span>
					<span><button type="button" disabled={!props.name || props.name.length === 0} onClick={props.handleSubmit} className='button' >Submit</button></span>
					<span><button type="button" disabled={false} onClick={props.handleCancel} className='button' >Cancel</button></span>
				</div>
			</div>
		</div>
	)
}

export default NameForm
