import React from 'react'
import '../styles/Card.css'

const Card = (props) => {

const { image } = props;

return (
	<div className="card" onClick={() => props.flipCard(props.id)} >
	{props.isFlipped ?
		<div className="card-up" ><img src={image} alt=""/></div> :
		<div className="card-down"></div>
	}
	</div>
	)
}


export default Card