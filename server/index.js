const express = require("express");
const app = express();
const multer = require('multer')
const path = require("path");
const cors = require('cors')
const crypto = require('crypto')
const Grid = require('gridfs-stream')
const GridFsStorage = require('multer-gridfs-storage')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const conn = mongoose.createConnection(config.mongoURI)

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

// Create Storage engine

const storage = new GridFsStorage({
  url: config.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          reject(err)
        }
        const filename = buff.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})
const upload = multer({ storage }).single('file')
 
app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, file: req.file })
  })
})

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

const { Comment } = require('./models/Comment');

app.use('/api/users', require('./routes/users'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/comments', require('./routes/comments'));

io.on('connection', socket => {
  socket.on('Create Comment', data => {
    connect.then(db => {
      try {
        let comment = new Comment({ 
          author: data.author, 
          content: data.content, 
          room: data.room 
        })
        
        comment.save((err, doc) => {
          if (err) return res.json({ success: false, err })

          Comment.find({ "_id": doc._id })
          .populate('author')
          .populate('room')
          .exec((err, doc) => {
            return io.emit("Output Post", doc)
          })
        })
      } catch (error) {
        
      }
    })
  })
  socket.on('Delete Post', post => {
    connect.then(db => {
      try {
        Comment.findByIdAndDelete(post.postId)
          .then(() => {
            let message = {
              msg: `Post - ${post.postId} deleted...`,
              id: post.postId
            }
            return io.emit('Output Delete Post', message)
          })
          .catch((err) => {
            return io.emit('Output Delete Post', err) 
          })
      } catch (error) {

      }
    })
  })
  socket.on('Update Post', data => {
    connect.then(db => {
      try {
        Comment.findByIdAndUpdate(data.id)
          .then(post => {
            post.content = data.content

            post.save()
          })
      } catch (error) {

      }
    })
  })
})

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});