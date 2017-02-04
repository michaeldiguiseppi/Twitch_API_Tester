var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Following = new Schema({
    name : String,
    url: String,
  });

mongoose.model('following', Following);

mongoose.connect('mongodb://localhost/twitch_following');
