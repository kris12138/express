var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var channelRouter = require('./routes/channel');
var songRouter = require('./routes/song');
var getTopRouter = require('./routes/getTop');
var getSongRouter = require('./routes/getSong');
var getChannelListRouter = require('./routes/getChannelList');
var getChannelRouter = require('./routes/getChannel');
var getHotSearchRouter = require('./routes/getHotSearch');
var getSearchRouter = require('./routes/getSearch');

var app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.set('views', __dirname);
app.set('view engine', 'html');
// 运行ejs模块
app.engine('.html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/channel*', channelRouter);
app.use('/song*', songRouter);
app.use('/getTop', getTopRouter);
app.use('/getSong', getSongRouter);
app.use('/getChannelList', getChannelListRouter);
app.use('/getChannel', getChannelRouter);
app.use('/getHotSearch', getHotSearchRouter);
app.use('search', getSearchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 300);
  res.render('error');
});

module.exports = app;
