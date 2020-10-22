import {
    CREATE_ROOM,
    GET_USER_ROOMS,
    GET_ROOM_CONTENT
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case CREATE_ROOM:
            return { ...state, data: action.payload }
        case GET_USER_ROOMS:
            return { ...state, data: action.payload }
        case GET_ROOM_CONTENT:
            return { ...state, data: action.payload }
        default:
            return state
    }
}