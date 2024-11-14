export default function images(state = { images: [], artistSlug: "", loading: false }, action) {
	
	switch (action.type) {

		case 'GET_IMAGES':
		return Object.assign({}, state, { images: action.payload.images, artistSlug: action.payload.slug } , { loading: false })
		
		case 'SET_LOADING':
		return Object.assign({}, state, { loading: action.payload })

		default:
		return state
	}
}
