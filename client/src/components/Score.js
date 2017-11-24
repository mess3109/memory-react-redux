import React from 'react'

const Score = (props) => {

const { name, counter, time } = props;
return (
		<div>{name}: {counter}</div>
	)
}

export default Score