const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: String, 
    desc: String, 
    img: 
    { 
        data: Buffer, 
        contentType: String 
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    } 
})

const Image = mongoose.model('Image', imageSchema);

module.exports = { Image }