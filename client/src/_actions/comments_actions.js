import axios from 'axios';
import {
    GET_ROOM_COMMENTS
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