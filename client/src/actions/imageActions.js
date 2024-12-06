const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchImages = (slug) => {
	console.log(process.env)
	return dispatch => {
		return fetch(`${API_BASE_URL}/artists/${slug}/images`)
			.then(response => response.json())
			.then(images => dispatch({ type: 'GET_IMAGES', payload: { slug: slug, images: images } }))
	}

}

export const setLoading = (boolean) => {
	return {
		type: 'SET_LOADING',
		payload: boolean
	};
}
