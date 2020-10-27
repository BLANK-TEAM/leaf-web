const express = require('express')
const router = express.Router()
const { PostComment } = require('../models/PostComment')

router.get('/:id', (req, res) => {
    PostComment.find({ post: req.params.id })
        .populate('author')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).send(comments)
        })
})

module.exports = router