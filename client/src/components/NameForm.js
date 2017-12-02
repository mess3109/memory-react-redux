import React from 'react'

const Name = (props) => {

return (
	<div className="nameForm">
		<form onSubmit={props.handleSubmit}>
			<input type="text" onChange={props.handleChange} placeholder="Name" value={props.name}/>
			<input type="submit"/>
		</form>
	</div>
	)
}

export default Name
