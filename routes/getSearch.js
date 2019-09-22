var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/*', function (req, res, next) {
  request({ url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=' + req.originalUrl.replace('/search/', '') + '&page=1&pagesize=20&showtype=1' },
    function (error, response, data) {
      res.send(data);
    })
});

module.exports = router;


 
