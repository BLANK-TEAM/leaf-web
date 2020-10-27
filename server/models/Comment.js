const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComment'
    }]
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }