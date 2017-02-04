var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Following = mongoose.model('following');

/* GET users listing. */
router.get('/followers', function(req, res, next) {
  Following.find(function(err, following){
    console.log(following)
    res.render(
      'api',
      {title : 'Twitch API', following : following}
    );
  });
});

router.get('/follower/:id', function(req, res, next) {
  console.log(req.params);
  var query = {'_id': req.params.id};
  Following.findOne(query, function(err, follower){
    console.log(follower)
    res.render(
      'follower',
      {title : 'Follower API - ' + follower.name, follower : follower}
    );
  });
});

router.post('/followers', function(req, res, next) {
  new Following({name : req.body.name, url: req.body.url})
  .save(function(err, follower) {
    console.log(follower)
    res.redirect('/api/followers');
  });
});

router.put('/follower/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name, url: req.body.url};
  var options = {new: true};
  Following.findOneAndUpdate(query, update, options, function(err, follower){
    console.log(follower)
    res.redirect('/api/followers');
    // res.render(
    //   'follower',
    //   {title : 'Follower API - ' + follower.name, follower : follower}
    // );
  });
});

router.delete('/follower/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Following.findOneAndRemove(query, function(err, follower){
    console.log(follower)
    res.redirect('/api/followers');
  });
});



module.exports = router;
