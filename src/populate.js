const fs = require('fs');

let savedPosts = null;

const Post = require('./post.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePosts = () => {
  allPosts = readPosts();
  const promises = allPosts.map(post => newPost(post).save());
    return Promise.all(promises);
};

module.exports = { readPosts, populatePosts };
