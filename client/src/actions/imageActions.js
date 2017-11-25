const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const API_URL = process.env.REACT_APP_URL;

export const fetchImages = (url) => {
	return dispatch => {
		return fetch(`https://api.artsy.net/api/tokens/xapp_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, { method: "POST" })
		.then(response => response.json())
		.then(responseJson => dispatch(afterToken(url, responseJson)))
	}
}

export const afterToken = (url, data) => {
	return dispatch => {
		return fetch(url, {
			headers: {
				'X-Xapp-Token': data.token,
				'Accept': 'application/vnd.artsy-v2+json'
			}})
		.then(response => response.json())
		.then(responseJson => dispatch({ type: 'GET_IMAGES', payload: responseJson._embedded.artworks }))
	}
}

