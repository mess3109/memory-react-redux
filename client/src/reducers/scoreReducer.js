export default function score(state = { scores: [] }, action) {
	switch(action.type) {

		case 'GET_SCORES':
		return Object.assign({}, state, { loading: true }) 

		case 'SHOW_SCORES':
		return {loading: false, scores: action.payload}

		default:
		return state;
	}
}