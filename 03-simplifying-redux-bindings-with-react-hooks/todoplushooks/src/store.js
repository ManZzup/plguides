// store.js

import { createStore } from 'redux'
import todoReducer from './reducers'

export default createStore(todoReducer)