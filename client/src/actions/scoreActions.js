export const scores = () => {
	return (dispatch) => {
		dispatch({ type: 'GET_SCORES' })
		return fetch('/api/games')
		.then(response => response.json())
		.then(responseJson => dispatch({ type: 'SHOW_SCORES', payload: responseJson }))
	}
};