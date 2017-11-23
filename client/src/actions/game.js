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

export function scores() {
	return (dispatch) => {
		dispatch({ type: 'GET_SCORES' })
		return fetch('/api/games')
		.then(response => response.json())
		.then(responseJson => dispatch({ type: 'SHOW_SCORES', payload: responseJson }))
	}
};

export function endGame(timer, name) {
  const score = JSON.stringify({
    game: {
      timer: timer,
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
		name
	};
};
