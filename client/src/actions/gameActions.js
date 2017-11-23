export const start = () => {
	return {
		type: 'START'
	};
};

export const flipCard = (id) => {
	return {
		type: 'FLIP_CARD',
		payload: id
	};
};

export const checkMatch = (flippedCards, cards) => {
	return {
		type: 'CHECK_MATCH',
		payload: new Promise((resolve,reject) => {
			setTimeout(() => { resolve([cards, flippedCards])}, 500 )
		} )
	}
}

export function gameOver(counter, name) {
	const score = JSON.stringify({
		game: {
			counter: counter,
			name: name
		}
	});
	return (dispatch) => {
		dispatch({ type: 'END_GAME' })
		return fetch('/api/games', {
			method: "post", body: score, headers: { "Content-Type": "application/json" }})
		.then(response => response.json())
	}
}

export const name = (name) => {
	return {
		type: 'ADD_NAME',
		payload: name
	};
};
