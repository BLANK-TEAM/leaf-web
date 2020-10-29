const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

router.get('/:id', (req, res) => {
    Comment.find({ room: req.params.id })
    .populate('author')
    .populate('comments')
    .exec((err, comments) => {
        if (err) return res.status(400).send({ error: err })
        console.log(comments)
        res.status(200).send(comments)
    })
})

module.exports = router