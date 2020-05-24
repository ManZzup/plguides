// actions.js

import * as mockAPI from './mockapi';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// These are our action types
export const SEARCH_REQUEST = "SEARCH_REQUEST"
export const SEARCH_SUCCESS = "SEARCH_SUCCESS"
export const SEARCH_ERROR = "SEARCH_ERROR"


// Now we define actions
export function searchRequest(query){
    return {
        type: SEARCH_REQUEST,
        payload: query
    }
}

export function searchSuccess(payload){
    return {
        type: SEARCH_SUCCESS,
        payload
    }
}

export function searchError(error){
    return {
        type: SEARCH_ERROR,
        error
    }
}

export function search(query) {
    return async function (dispatch) {
        dispatch(searchRequest(query));
        try{
            const response = await mockAPI.searchAPI(query);
            dispatch(searchSuccess(response.data));
        }catch(error){
            dispatch(searchError(error));
        }
    }
}

const debouncedSearchAPI = debounce(async (query) => {
    return await mockAPI.searchAPI(query)
}, 800, { leading: true });

export function debouncedSearch(query) {
    return async function (dispatch) {
        dispatch(searchRequest(query));
        try{
            const response = await debouncedSearchAPI(query);
            dispatch(searchSuccess(response.data));
        }catch(error){
            console.log(error)
            dispatch(searchError(error));
        }
    }
}

const throttledSearchAPI = throttle(async (query) => {
    return await mockAPI.searchAPI(query)
}, 300, { leading: true });

export function throttledSearch(query) {
    return async function (dispatch) {
        dispatch(searchRequest(query));
        try{
            const response = await throttledSearchAPI(query);
            dispatch(searchSuccess(response.data));
        }catch(error){
            console.log(error)
            dispatch(searchError(error));
        }
    }
}