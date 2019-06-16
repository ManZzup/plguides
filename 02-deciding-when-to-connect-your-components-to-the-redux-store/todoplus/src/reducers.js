// reducers.js

import { DELETE_ITEM, PRINT_ITEM, TOGGLE_CHECK } from './actions';

const initialState = {
    tasks: [
        {
            label: "Task 01",
            isCheckItem: false,
            hasActions: false,
            isChecked: false
        },
        {
            label: "Task 02",
            isCheckItem: true,
            hasActions: false,
            isChecked: true
        },
        {
            label: "Task 03",
            isCheckItem: false,
            hasActions: true,
            isChecked: false
        },
        {
            label: "Task 04",
            isCheckItem: true,
            hasActions: true,
            isChecked: false
        }
    ]
}

export default function todoReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch(action.type){
        case DELETE_ITEM:
            console.log("deleting");
            break;
        
        case PRINT_ITEM:
            console.log("printing");
            break;
        
        case TOGGLE_CHECK:  
            var items = [...state.tasks];
            items[action.itemIndex].isChecked = !items[action.itemIndex].isChecked;
            state = {...state, tasks: items};
    }

    // We create an empty reducer for now

    return state
}