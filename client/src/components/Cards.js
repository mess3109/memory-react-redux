import React from 'react'
import Card from './Card'
import '../styles/Cards.css'

const Cards = (props) => {

	return (
		<div className="cardsContainer">
			<div className="cards">
				{props.cards.map(card =>
					<Card
						key={card.id}
						id={card.id}
						image={card.image}
						isFlipped={card.isFlipped}
						flipCard={props.flipCard}
					/>
				)}
			</div>
		</div>
	);

}

export default Cards;
