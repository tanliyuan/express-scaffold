var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var middlewareConfig = require('./support/middlewareConfig');

var app = express();

// const logger = require('./support/log4js').getLogger(__filename);
// view engine setup
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//中间件统一在这里面配置
middlewareConfig(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;