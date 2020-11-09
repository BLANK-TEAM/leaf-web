const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    subTitle: {
        type: String,
        required: true,
        unique: true
    },
    learnItems: {
        type: String,
        required: true,
        unique: true
    },
    coverImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    languages: [{
        type: String,
        required: true
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course }