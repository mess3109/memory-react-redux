export default function images(state = { images: [], artistSlug: "", loading: false }, action) {
	
	switch (action.type) {

		case 'GET_IMAGES':
		const images = action.payload.images.filter(artwork => typeof artwork._links.thumbnail === "object")
		return Object.assign({}, state, { images: images, artistSlug: action.payload.slug } , { loading: false })
		
		case 'SET_LOADING':
		return Object.assign({}, state, { loading: action.payload })

		default:
		return state
	}
}
