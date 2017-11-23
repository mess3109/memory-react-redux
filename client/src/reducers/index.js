import { combineReducers } from 'redux';
import game from './gameReducer'
import score from './scoreReducer'
 
const rootReducer = combineReducers({
	game,
	score
});
 
export default rootReducer;