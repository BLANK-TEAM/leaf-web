const express = require("express");
const app = express();
const multer = require('multer')
const path = require("path");
const cors = require('cors')

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

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

const { Comment } = require('./models/Comment');
const { PostComment } = require('./models/PostComment');

app.use('/api/users', require('./routes/users'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/postComments', require('./routes/postComments'));
app.use('/api/courses', require('./routes/Course/course'));

io.on('connection', socket => {
  socket.on('Create Post', data => {
    connect.then(db => {
      try {
        let comment = new Comment({ 
          author: data.author, 
          content: data.content, 
          room: data.room,
          comments: data.comments 
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
  socket.on('Delete Post Comment', comment => {
    connect.then(db => {
      try {
        console.log(comment.id)
        PostComment.findById(comment.id)
          .then((item) => {
            PostComment.findByIdAndDelete(comment.id)
            .then(() => {
              const msg = {
                message: 'Deleted successfully!',
                status: true,
                comment: item
              }
              return io.emit('Output Delete Post Comment', msg)
            })
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
  socket.on('Create Post Comment', comment => {
    connect.then(db => {
      try {
        let newComment = new PostComment({ 
          author: comment.author, 
          content: comment.content, 
          post: comment.post
        })

        newComment.save((err, doc) => {
          if (err) return res.json({ success: false, err })

          PostComment.find({ "_id": doc._id })
          .populate('author')
          .populate('post')
          .exec((err, doc) => {
            return io.emit('Output Post Comment', doc)
          })

        })
      } catch(error) {

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