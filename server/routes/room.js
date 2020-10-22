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
        courses: req.body.courses
    })

    room.save()
        .then(() => res.send('Room created!'))
        .catch(err => res.status(400).send({ error: err }))
})

module.exports = router