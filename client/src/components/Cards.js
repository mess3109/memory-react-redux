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
		<div className="cardsContainer">
			<div className="cards">
			{props.loading ? cards : ""}
			</div>
		</div>
		);

	}

	export default Cards;
