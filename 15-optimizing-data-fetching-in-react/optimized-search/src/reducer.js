// reducers.js

import { SEARCH_REQUEST, SEARCH_SUCCESS } from './actions';

const initialState = {
    searchResults: [],
    hits: 0,
    currentQuery: ""
}

export default function searchReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch(action.type){
        case SEARCH_REQUEST:
            state.currentQuery = action.payload;
            break;

        case SEARCH_SUCCESS:
            if(state.currentQuery === action.payload.query){
                state.searchResults = action.payload.results;
                state.hits = action.payload.hits;
            }
            break;
    }

    return state
}