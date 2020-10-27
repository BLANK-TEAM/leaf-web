import { combineReducers } from 'redux';
import user from './user_reducer';
import room from './room_reducer';
import comment from './comment_reducer'
import postComment from './post_comment_reducer'

const rootReducer = combineReducers({
    user,
    room,
    comment,
    postComment
});

export default rootReducer;