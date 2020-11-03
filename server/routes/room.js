const express = require('express');
const router = express.Router();
const { Room } = require("../models/Room");

const { auth } = require("../middleware/auth");

router.post('/', (req, res) => {
    const room = new Room({
        name: req.body.name,
        subject: req.body.subject,
        users: req.body.users,
        messages: req.body.messages,
        courses: req.body.courses,
        roomKey: req.body.roomKey,
        author: req.body.author
    })

    room.save()
        .then(() => res.send('Room created!'))
        .catch(err => res.status(400).send({ error: err }))
})

router.get('/:id', (req, res) => {
    Room.find({ users: req.params.id })
    .populate('users')
    .exec((err, rooms) => {
        if (err) return res.status(400).send({ error: err })
        res.status(200).send(rooms)
    })
})

router.get('/room/:id', (req, res) => {
    Room.find({ roomKey: req.params.id })
        .populate('users')
        .exec((err, room) => {
            if (err) return res.status(400).send({ error: err })
            res.status(200).send(room[0])
        })
})

module.exports = router