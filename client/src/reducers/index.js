import { combineReducers } from 'redux';
import game from './gameReducer'
import score from './scoreReducer'
import image from './imageReducer'
 
const rootReducer = combineReducers({
	game,
	score,
	image
});
 
export default rootReducer;