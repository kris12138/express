var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
  request({ url: 'http://m.kugou.com/rank/info/?rankid=8888&page=1&json=true' },
    function (error, response, data) {
      let result = data
      result = result.replace('callback({', '{').replace(')', '')
      var data_ = JSON.parse(result)
      res.send(data_);
    })
});

module.exports = router;



