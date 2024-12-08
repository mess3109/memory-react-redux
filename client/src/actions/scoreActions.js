export const scores = () => {
	return (dispatch) => {
		return fetch(`/api/games`)
			.then(response => response.json())
			.then(responseJson => dispatch({ type: 'SHOW_SCORES', payload: responseJson.games }))
	}
};