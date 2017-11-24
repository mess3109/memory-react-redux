export default function image(state = { images: [] }, action) {
	switch (action.type) {
		case 'GET_IMAGES':
		console.log(action.payload)
		return Object.assign({}, state, { images: state.images.concat(action.payload) } )
		default:
		return state
	}
}
