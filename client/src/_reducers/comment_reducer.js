import {
    AFTER_POST_POST,
    GET_ROOM_COMMENTS,
    DELETE_POST
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case GET_ROOM_COMMENTS:
            return { ...state, comments: action.payload }
        case AFTER_POST_POST:
            return { ...state, comments: state.comments.concat(action.payload)}
        case DELETE_POST:
            return { ...state, comments: state.comments.filter(item => item !== action.payload) }
        default:
            return state
    }
}