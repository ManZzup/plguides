// These are our action types
export const SEARCH_LIST = "SEARCH_LIST"


// Now we define actions
export function searchList(query){
    return {
        type: SEARCH_LIST,
        query
    }
}
