var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n-express');
var request = require('request');

var app = express();

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
app.use(i18n({
  translationsPath: path.join(__dirname, 'locales'),
  siteLangs: ["en","ru"]
}));

app.get('/', function(req, res, next) {
  request('https://api.controlio.co/discount', function(err, response, body) {
    console.log(body);
    var json = JSON.parse(body);
    res.render('index', { discount: json.uses });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  request('https://api.controlio.co/discount', function(err, response, body) {
    var json = JSON.parse(body);
    res.render('index', { discount: json.uses });
  });
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
