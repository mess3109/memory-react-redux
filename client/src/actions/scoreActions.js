export const scores = () => {
	return (dispatch) => {
		return fetch('http://localhost:3001/games')
			.then(response => response.json())
			.then(responseJson => dispatch({ type: 'SHOW_SCORES', payload: responseJson.games }))
	}
};