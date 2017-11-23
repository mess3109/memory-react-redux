import React from 'react'

const Name = (props) => {

		return (
			<div>
			<form onSubmit={props.handleSubmit}>
			<label>Name</label>
			<input type="text" onChange={props.handleChange}/>
			<input type="submit"/>
			</form>
			</div>
			)
}

export default Name
