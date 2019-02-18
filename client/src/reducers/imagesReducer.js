export default function images(state = { images: [], artistSlug: "" }, action) {
	
	switch (action.type) {

		case 'GET_IMAGES':
		const images = action.payload.images.filter(artwork => typeof artwork._links.thumbnail === "object")
		return Object.assign({}, state, { images: images, artistSlug: action.payload.slug } )
		
		default:
		return state
	}
}
