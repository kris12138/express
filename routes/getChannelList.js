var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
    request({ url: 'http://m.kugou.com/plist/index&json=true' },
        function (error, response, data) {
            res.send(data);
        })
});

module.exports = router;








