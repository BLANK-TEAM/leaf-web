import axios from 'axios';
import {
    CREATE_ROOM,
    GET_USER_ROOMS
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

export function createNewRoom(dataToSubmit) {
    const request = axios.post(`${ROOM_SERVER}`, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: CREATE_ROOM,
        payload: request
    }
}