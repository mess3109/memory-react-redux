const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const scores = () => {
	return (dispatch) => {
		return fetch(`/api/games`)
			.then(response => response.json())
			.then(responseJson => dispatch({ type: 'SHOW_SCORES', payload: responseJson.games }))
	}
};