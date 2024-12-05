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
		payload: new Promise((resolve, reject) => {
			setTimeout(() => { resolve() }, 1000)
		})
	}
}

export const gameOver = (total, name, artistSlug, history) => {
	const score = JSON.stringify({
		game: {
			total,
			name,
			artistSlug,
		}
	});
	return (dispatch) => {
		return fetch('http://localhost:3001/games', {
			method: "post", body: score, headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(() => {
				dispatch({ type: 'END_GAME' })
				history.push('/scores')
			})
	}
}

export const name = (name) => {
	return {
		type: 'ADD_NAME',
		payload: name
	};
};
