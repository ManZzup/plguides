import { INCREASE_COUNTER } from './actions';

const initState = {
    counter: 0
}

export default function counterReducer(state, action) {
    if (typeof state === 'undefined') {
        return initState
    }

    switch(action.type){
        case INCREASE_COUNTER:
            state.counter = state.counter + 1;
            break;
    }

    return state
}