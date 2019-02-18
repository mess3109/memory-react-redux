export default function images(state = { images: [], artistSlug: "" }, action) {
	switch (action.type) {
		case 'GET_IMAGES': 
		return Object.assign({}, state, { images: action.payload.images, artistSlug: action.payload.slug } )
		default:
		return state
	}
}
