var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/*', function (req, res, next) {
  request({ url: 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + req.originalUrl.replace('/getSong/', '') },
    function (error, response, data) {
      res.send(data);
    })
});

module.exports = router;



