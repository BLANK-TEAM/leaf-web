const express = require('express');
const router = express.Router();
const { Course } = require('../../models/Course/Course');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).send('only jpg, png are allowed'), false)
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single('file')

router.post('/uploadImage', (req, res) => {

    upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post('/getCourses/:id', (req, res) => {

    Course.find({ room: req.params.id })
        .populate('author')
        .populate('room')
        .populate('teachers')
        .exec((err, courses) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, courses })
            console.log(courses)
        })

})

router.post('/add', (req, res) => {
    const course = new Course({
        title: req.body.title,
        subTitle: req.body.subTitle,
        learnItems: req.body.learnItems,
        images: req.body.images,
        languages: req.body.languages,
        teachers: req.body.teachers,
        room: req.body.room,
        author: req.body.author,
        lessons: req.body.lessons,
        reviews: req.body.reviews
    })

    course.save()
        .then(() => res.send({ success: true }))
        .catch(err => {
            res.status(400).send({ error: err })
            console.log({ error: err })
        });
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