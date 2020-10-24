import {
    AFTER_POST_POST,
    GET_ROOM_COMMENTS
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case GET_ROOM_COMMENTS:
            return { ...state, comments: action.payload }
        case AFTER_POST_POST:
            return { ...state, comments: state.comments.concat(action.payload)}
        default:
            return state
    }
}