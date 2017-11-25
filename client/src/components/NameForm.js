import React from 'react'

const Name = (props) => {

	return (
		<div className="nameForm">
		{props.gameOver ?
			<form onSubmit={props.handleSubmit}>
			<input type="text" onChange={props.handleChange} placeholder="name" value={props.name}/>
			<input type="submit"/>
			</form> : ""
		}
		</div>
		)
}

export default Name
