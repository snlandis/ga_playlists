var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new mongoose.Schema({
  playlist: {
    type: ObjectId,
    required: true,
    ref: 'Playlist',
    index: true
  },
  song: {
    type: ObjectId,
    required: true,
    ref: 'Song',
    index: true
  },
  created: Date
});

var model = mongoose.model('PlaylistSong', schema);

module.exports = model;
