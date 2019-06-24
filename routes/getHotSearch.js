var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
  request({ url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' },
    function (error, response, data) {
      res.send(data);
    })
});

module.exports = router;



