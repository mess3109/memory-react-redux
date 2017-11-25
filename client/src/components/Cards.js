import React from 'react'
import Card from './Card'
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
			{cards}
			</div>
		</div>
		);

	}

	export default Cards;
