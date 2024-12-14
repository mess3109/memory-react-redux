import React from 'react'
import '../styles/Card.css'

const Card = ({ image, flipCard, id, isFlipped }) => {

	const onClick = () => {
		flipCard(id)
	};

	return (
		<div className="card" onClick={onClick}>
			{
				isFlipped ?
					<div className="card-up" ><img src={image} alt="" /></div> :
					<div className="card-down"></div>
			}
		</div >
	)
}


export default Card