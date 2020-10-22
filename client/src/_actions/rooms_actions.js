import axios from 'axios';
import {
    CREATE_ROOM,
    GET_USER_ROOMS,
    GET_ROOM_CONTENT
} from './types';
import { ROOM_SERVER } from '../components/Config.js';

export function getUserRooms(userId) {
    const request = axios.get(`${ROOM_SERVER}/${userId}`)
        .then(response => response.data);
    
    return {
        type: GET_USER_ROOMS,
        payload: request
    }
}

export function getRoomContent(key) {
    const request = axios.get(`${ROOM_SERVER}/room/${key}`)
        .then(response => response.data);
    
    return {
        type: GET_ROOM_CONTENT,
        payload: request
    }
} 

export function createNewRoom(dataToSubmit) {
    const request = axios.post(`${ROOM_SERVER}`, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: CREATE_ROOM,
        payload: request
    }
}