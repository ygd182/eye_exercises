var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dotenv = require('dotenv');
dotenv.load();

var config = require('config');


// =============================================================================
// Express CONFIGURATION
// =============================================================================

var app = express();

var httpPort = config.get('port');
app.set('port', process.env.PORT || httpPort);

app.set('db_user', process.env.db_user);
app.set('db_pass', process.env.db_pass);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passportConfig  = require('./middleware/passport-config')();
app.use(passportConfig.initialize());

//=================================================================================

app.use('/', require('./routes')(passportConfig));



//=============================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err.message);
  res.status(err.status || 500);
  res.json({error: err});
});

// =============================================================================
// DB CONFIGURATION
// =============================================================================

var dbUrl = 'mongodb://' + app.get('db_user') + ':' + app.get('db_pass') + config.mongodb.instances[0].host + ':' + config.mongodb.instances[0].port + '/' + config.mongodb.db;
app.set('dbUrl', dbUrl);

var mongooseConnection = require('./middleware/mongooseConnection');

app.use(mongooseConnection);


module.exports = app;
