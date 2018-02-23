const fs = require('fs');
const mongoose = require('mongoose');

let savedPosts = null;
mongoose.Promise = global.Promise;

const Post = require('./post.js');

mongoose.connect('mongodb://schroeder:pass@ds245548.mlab.com:45548/lsplay', { useMongoClient: true });

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePosts = () => {
  const allPosts = readPosts();
  const promises = allPosts.map(post => new Post(post).save());
  return Promise.all(promises);
};

module.exports = { readPosts, populatePosts };
