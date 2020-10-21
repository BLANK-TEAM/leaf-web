const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String
    },
    subject: {
        type: String
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room }