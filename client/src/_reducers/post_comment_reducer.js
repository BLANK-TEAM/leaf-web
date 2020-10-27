import {
    GET_POST_COMMENTS,
    AFTER_POST_COMMENT
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case GET_POST_COMMENTS:
            return { ...state, postComments: action.payload }
        case AFTER_POST_COMMENT:
            return { ...state, postComments: state.postComments.concat(action.payload) }

        default:
            return state
    }
}