import { compose, createStore, applyMiddleware } from 'redux';
import thunk from'redux-thunk';
import mainReducer from '../app/reducers';

export const store = createStore(
    mainReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
