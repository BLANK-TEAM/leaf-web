const express = require('express');
const router = express.Router();
const { Course } = require('../../models/Course/Course');

router.post('/', (req, res) => {
    const course = new Course({
        title: req.body.title,
        titleDesc: req.body.titleDesc,
        description: req.body.description,
        room: req.body.room,
        author: req.body.author,
        lessons: req.body.lessons,
        reviews: req.body.reviews
    })

    course.save()
        .then(() => res.send(`Course ${req.body.title} - created.`))
        .catch((err) => res.status(400).send({ error: err }))
})

router.get('/', (req, res) => {
    Course.find()
        .then((courses) => res.send(courses))
        .catch((err) => res.status(400).send({ error: err }))
})

router.post('/:id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id)
        .then((course) => {
            course.lessons.push(req.body.lesson)

            course.save()
                .then(() => res.send('Added!'))
                .catch((err) => res.status(400).send(err))
        })
        .catch((err) => res.status(400).send({ error: err }))
})

module.exports = router