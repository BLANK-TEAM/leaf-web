const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

router.get('/:id', (req, res) => {
    Comment.find({ room: req.params.id })
    .populate('author')
    .exec((err, comments) => {
        if (err) return res.status(400).send({ error: err })
        res.status(200).send(comments)
        console.log(comments)
    })
})

module.exports = router