export default function artist(state = { artist_id: "", images: [] }, action) {
	switch (action.type) {
		case 'SET_ARTIST':
		return Object.assign({}, state, { artist_slug: action.payload } )
		case 'GET_IMAGES': 
		return Object.assign({}, state, { images: action.payload } )
		default:
		return state
	}
}
