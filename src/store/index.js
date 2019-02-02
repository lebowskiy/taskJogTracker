import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

const configureStore = initialState => createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
const store = configureStore();

export default store;