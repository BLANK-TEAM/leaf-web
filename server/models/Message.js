const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }