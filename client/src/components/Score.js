import React from 'react'
import '../styles/Scores.css'

const Score = (props) => {

const { name, counter } = props;
const date = new Date(props.date)
const m = date.getMonth() + 1
const d = date.getDate()
const y = date.getYear().toString().substr(-2)

return (		
		<div className="score-container"><span className="date">{m}-{d}-{y}</span><span className="name">{name}</span><span className="score">{counter}</span></div>
	)
}

export default Score
