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
  const { soID } = req.params;
  Post.findOne({soID})
  .then(id => {
    console.log(id);
    const answerID = id.acceptedAnswerID;
    console.log(answerID);
    Post.findOne({ soID: answerID })
    .then(acceptedID => {
      res.send(acceptedID);
    })
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
