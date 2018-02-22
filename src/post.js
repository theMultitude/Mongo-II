const mongoose = require('mongoose');

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/so-posts', { useMongoClient: true });

const PostSchema = new mongoose.Schema({
    soID: {
      type: Number,
      required: true,
    },
    parentID: {
      type: Number,
      default: null,
    },
    url: {
      type:String,
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
    },
    acceptedAnswerID: {
      type: Number,
      default: null,
    },
    user: {
        soUserID: {
          type: Number,
          required: true,
      },
        name: {
          type: String,
          required: true,
      },
        reputation: {
          type: Number,
          required: true,
      }
    }
});

module.exports = mongoose.model('Posts', PostSchema);
