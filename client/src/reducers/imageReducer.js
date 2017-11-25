export default function image(state = { images: [] }, action) {
	switch (action.type) {
		case 'GET_IMAGES':
		return Object.assign({}, state, { images: action.payload } )
		default:
		return state
	}
}
