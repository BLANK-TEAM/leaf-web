import axios from 'axios'
import {
    GET_POST_COMMENTS,
    AFTER_POST_COMMENT
} from './types'
import { POST_COMMENT_SERVER } from '../components/Config'

export function getComments(id) {
    const request = axios.get(`${POST_COMMENT_SERVER}/${id}`)
        .then(response => response.data)

    return {
        type: GET_POST_COMMENTS,
        payload: request
    }
}

export function afterPostComment(data) {
    return {
        type: AFTER_POST_COMMENT,
        payload: data
    }
}