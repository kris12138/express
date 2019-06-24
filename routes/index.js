var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
  // console.log(res)
  // res.send(res);
});

module.exports = router;



