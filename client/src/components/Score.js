import React from 'react'

const Score = (props) => {

const { name, timer } = props;
return (
		<div>{name}: {timer}</div>
	)
}


export default Score