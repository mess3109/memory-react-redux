import { combineReducers } from 'redux';
import game from './gameReducer'
import score from './scoreReducer'
import images from './imagesReducer'
 
const rootReducer = combineReducers({
	game,
	score,
	images
});
 
export default rootReducer;