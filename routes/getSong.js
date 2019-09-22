var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/*', function (req, res, next) {
  request(
    { url: 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&hash=' + req.originalUrl.replace('/getSong/', '') + '&mid=f46e8e0cb57ca6a207eac94e5d8106d8' },
    function (error, response, body) {
      res.send(body);
    })
});

module.exports = router;


