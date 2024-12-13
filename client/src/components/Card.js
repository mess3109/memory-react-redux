import React from 'react'
import '../styles/Card.css'

const Card = ({ image, disableClick, flipCard, id, isFlipped }) => {

	const onClick = () => {
		if (!disableClick) {
			flipCard(id)
		}
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