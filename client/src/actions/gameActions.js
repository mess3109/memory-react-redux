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

export function gameOver(timer, name) {
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
