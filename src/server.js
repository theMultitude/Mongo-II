const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(bodyParser.json());

// TODO: write your route handlers here

server.get('/accepted-answer/:soID', (req, res) => {
  const { id } = req.params;
  Post.find({ id })
  .then(id => {
    res.send(id);
  }).catch(error => {
    res.status(500).send({ error });
  })
})

// mongoose.connect('mongodb://localhost/soPosts', { useMongoClient: true })
//   .then(each => {
//     const post = populatePosts();
//     Post.create(post)
//       .then(posts => {
//         console.log('Posts were populated successfully on soPosts database.');
//       }).catch(error => {
//         console.log('Failed to populate the database');
//       })
//   }).catch(error => {
//     console.log('Failed to connect to the database.');
//   })

module.exports = { server };
