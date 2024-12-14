import React from 'react'

const NameForm = (props) => {

	return (
		<div className="nameForm">
			<form onSubmit={props.handleSubmit}>
				<input type="text" onChange={props.handleChange} placeholder="Name" value={props.name} />
				<input type="submit" disabled={!props.name || props.name.length === 0} />
			</form>
		</div>
	)
}

export default NameForm
