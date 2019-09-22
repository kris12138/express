var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('recommend_channel_list');
});

module.exports = router;



