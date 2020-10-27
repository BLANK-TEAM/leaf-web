const mongoose = require('mongoose');

const postCommentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: true })

const PostComment = mongoose.model('PostComment', postCommentSchema);

module.exports = { PostComment }