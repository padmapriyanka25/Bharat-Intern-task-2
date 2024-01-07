const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for blog posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Create a model
const Post = mongoose.model('Post', postSchema);

// Express routes
app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { posts: posts });
        }
    });
});

app.get('/posts/:postId', (req, res) => {
    const requestedPostId = req.params.postId;
    Post.findOne({ _id: requestedPostId }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            res.render('post', {
                post: post
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
