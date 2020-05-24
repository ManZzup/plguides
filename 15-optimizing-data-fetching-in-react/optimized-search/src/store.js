import { createStore, applyMiddleware } from 'redux'
import searchReducer from './reducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(searchReducer, composeWithDevTools(applyMiddleware(thunk)));