const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1MTA0NDY1NiwiaWF0IjoxNTUwNDM5ODU2LCJhdWQiOiI1YTFmN2E4Y2M5ZGMyNDA2NzhkMGU3OGQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWM2OWQ1YjBmNjEyYTkyOTdhNzRiMGY3In0.itwKhIaRWoXog6CcFVzonBziA3RkM2z5MSYHNTG1g9I"

export const fetchImages = (slug) => {

	const headers = {
				'Accept': 'application/vnd.artsy-v2+json'
			}

	return dispatch => {
		return fetch(`https://api.artsy.net/api/tokens/xapp_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, { method: "POST" })
		.then(response => response.json())
		.then(data => { headers['X-Xapp-Token'] = data.token})
		.then(data => fetch("https://api.artsy.net/api/artists/" + slug, { headers } ))
		.then(response => response.json())
		.then(data => fetch("https://api.artsy.net/api/artworks?size=10&artist_id=" + data.id, { headers }))
		.then(response => response.json())
		.then(data => dispatch({ type: 'GET_IMAGES', payload: data._embedded.artworks }))
	}
}
