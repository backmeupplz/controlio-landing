var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');

var app = express();

i18n.configure({
  locales: ['en', 'ru'],
  directory: [__dirname, 'locales'].join('/'),
  defaultLocale: 'en',
  queryParameter: 'lang'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.get('/', function(req, res, next) {
  res.render('index', {});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index', {});
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
