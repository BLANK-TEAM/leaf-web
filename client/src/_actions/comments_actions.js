import axios from 'axios';
import {
    GET_ROOM_COMMENTS,
    AFTER_POST_POST,
    DELETE_POST
} from './types';
import { COMMENT_SERVER } from '../components/Config.js';

export function getRoomComments(roomId) {
    const request = axios.get(`${COMMENT_SERVER}/${roomId}`)
        .then(response => response.data);
    
    return {
        type: GET_ROOM_COMMENTS,
        payload: request
    }
}

export function afterPostPost(post) {
    return {
        type: AFTER_POST_POST,
        payload: post
    }
}

export function deletePost(post) {
    return {
        type: DELETE_POST,
        payload: post
    }
}