export const start = () => {
	return {
		type: 'START'
	};
};

export const flipCard = (id) => {
	return {
		type: 'FLIP_CARD',
		id
	};
};

export const checkMatch = (flippedCards, cards) => {
	return {
		type: 'CHECK_MATCH',
		cards, 
		flippedCards
	};
};