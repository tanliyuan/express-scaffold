var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var loadroutes = require('./support/loadroutes');

var config = require('config');

// session 存储到mongodb
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// const logger = require('./support/log4js').getLogger(__filename);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(config.get('secret')));
app.use(session({
  secret: config.get('secret'),//与cookieParser中的一致
  resave: true,
  saveUninitialized: false,
  name: 'sessionId',
  store : new MongoStore({ 
      url: config.get('db_url')
   })
}));

app.use(express.static(path.join(__dirname, 'public')));


//自动载入 routes文件夹下的路由
loadroutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
