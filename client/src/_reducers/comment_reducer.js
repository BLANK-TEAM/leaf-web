import {
    GET_ROOM_COMMENTS
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case GET_ROOM_COMMENTS:
            return { ...state, comments: action.payload }
        default:
            return state
    }
}