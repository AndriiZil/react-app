import { combineReducers } from 'redux';
import mainReducer from './main';

const reducers = combineReducers({
    app: mainReducer,
});

export default reducers;