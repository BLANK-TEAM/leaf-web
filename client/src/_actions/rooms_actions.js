import axios from 'axios';
import {
    CREATE_ROOM
} from './types';
import { ROOM_SERVER } from '../components/Config.js';

export function createNewRoom(dataToSubmit) {
    const request = axios.post(`${ROOM_SERVER}`, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: CREATE_ROOM,
        payload: request
    }
}