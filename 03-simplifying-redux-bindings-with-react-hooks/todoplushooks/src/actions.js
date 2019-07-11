// actions.js

// These are our action types
export const DELETE_ITEM = "DELETE_ITEM"
export const PRINT_ITEM = "PRINT_ITEM"
export const TOGGLE_CHECK = "TOGGLE_CHECK"


// Now we define actions
export function deleteItem(itemIndex){
    return {
        type: DELETE_ITEM,
        itemIndex
    }
}

export function printItem(itemIndex){
    return {
        type: PRINT_ITEM,
        itemIndex
    }
}

export function togglCheck(itemIndex){
    return {
        type: TOGGLE_CHECK,
        itemIndex
    }
}