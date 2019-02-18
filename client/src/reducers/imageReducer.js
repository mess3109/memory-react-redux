export default function artist(state = { artist_id: "", images: [] }, action) {
	switch (action.type) {
		case 'GET_IMAGES': 
		return Object.assign({}, state, { images: action.payload } )
		default:
		return state
	}
}
