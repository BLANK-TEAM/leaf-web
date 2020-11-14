const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
}, { timestamps: true })

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson }