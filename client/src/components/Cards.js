import React from 'react'
import Card from './Card.js'
import '../styles/Cards.css'

const Cards = (props) => {

	const cards = props.cards.map(card => 
		<Card 
		key={card.id}
		id={card.id}
		image={card.image}
		isFlipped={card.isFlipped}
		flipCard={props.flipCard}
		/>
		)

		return (
		<div className="cards">
		{cards}
		</div>
		);
	
}

export default Cards;
