export const start = (images) => {
	return {
		type: 'START',
		payload: images
	};
};

export const flipCard = (id) => {
	return {
		type: 'FLIP_CARD',
		payload: id
	};
};

export const checkMatch = () => {
	return {
		type: 'CHECK_MATCH',
		payload: new Promise((resolve,reject) => {
			setTimeout(() => { resolve() }, 500 )
		} )
	}
}

export const gameOver = (counter, name) => {
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
		// .then(window.location.href = "/scores")
	}
}

export const name = (name) => {
	return {
		type: 'ADD_NAME',
		payload: name
	};
};
