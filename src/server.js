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
  Post.findOne({ soID })
    .then((id) => {
      const acceptedID = id.acceptedAnswerID;
      Post.findOne({ soID: acceptedID }).then((acceptedAnswer) => {
        res.send(acceptedAnswer);
      });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

server.get('/top-answer/:soID', (req, res) => {
  const { soID } = req.params;
  Post.findOne({ soID })
    .then((id) => {
      const acceptedID = id.acceptedAnswerID;
      Post.find({ parentID: soID })
        .sort({ score: -1 })
        .then((scores) => {
          if (scores[0].soID === acceptedID) {
            res.send(scores[1]);
          } else {
            res.send(scores[0]);
          }
        });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

server.get('/popular-jquery-questions', (req, res) => {
  Post.find({ tags: 'jquery' })
    .or([{ score: { $gt: 5000 } }, { 'user.reputation': { $gt: 200000 } }])
    .then((r) => {
      res.send(r);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Could not find jquery questions.' });
    });
});

server.get('/npm-answers', (req, res) => {
  Post.find({ tags: 'npm' })
    .then((items) => {
      const ids = [];
      items.forEach((thing) => {
        ids.push(thing.soID);
      });
      Post.find({ parentID: ids }).sort({ parentID: -1, score: -1 }).then((answers) => {
        res.send(answers);
      });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

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
