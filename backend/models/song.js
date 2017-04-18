var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  artist: {type: String, required: true},
  title: {type: String, required: true},
  spotifySongId: {type: String, required: true},
  album: String,
  year: Date,
  created: Date
});

var model = mongoose.model('Song', schema);

module.exports = model;
