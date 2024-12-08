export const fetchArtists = () => {
	return dispatch => {
		return fetch(`/api/artists`)
			.then(response => response.json())
			.then(data => dispatch({ type: 'GET_ARTISTS', payload: { artists: data.artists } }))
	}
}

export const fetchImages = (slug) => {
	return dispatch => {
		return fetch(`/api/artists/${slug}/images`)
			.then(response => response.json())
			.then(data => dispatch({ type: 'GET_IMAGES', payload: { slug: slug, images: data.images } }))
	}
}

export const setLoading = (boolean) => {
	return {
		type: 'SET_LOADING',
		payload: boolean
	};
}
