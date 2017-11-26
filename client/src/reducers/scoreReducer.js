export default function score(state = { scores: [] }, action) {
	switch(action.type) {
		
		case 'SHOW_SCORES':
		return { scores: action.payload }

		default:
		return state;
	}
}