import React from 'react'

const Score = (props) => {

const { name, counter } = props;
const date = new Date(props.date)
const m = date.getMonth() + 1
const d = date.getDate()
const y = date.getYear().toString().substr(-2)

return (		
		<div>{m}-{d}-{y} {name}: {counter}</div>
	)
}

export default Score
