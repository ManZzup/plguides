import { createStore, applyMiddleware } from 'redux'
import chatReducer from './reducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(chatReducer, composeWithDevTools(applyMiddleware(thunk)));