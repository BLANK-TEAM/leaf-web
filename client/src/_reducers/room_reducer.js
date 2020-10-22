import {
    CREATE_ROOM
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case CREATE_ROOM:
            return { ...state, data: action.payload }
        default:
            return state
    }
}