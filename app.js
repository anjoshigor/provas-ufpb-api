var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var login = require('./app_server/routes/login');
var register = require('./app_server/routes/register');
var dashboard = require('./app_server/routes/dashboard');

/**API**/
var api_index = require('./api/routes/index');
var api_centro = require('./api/routes/centro');
var api_curso = require('./api/routes/curso');
var api_disciplina = require('./api/routes/disciplina');

require('./api/model/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server' ,'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**API**/
app.use('/api/v1', api_index);
app.use('/api/v1', api_centro);
app.use('/api/v1', api_curso);
app.use('/api/v1', api_disciplina);

app.use('/', index);
app.use('/api-admin', login);
app.use('/register', register);
// provisório
app.use('/dashboard', dashboard);

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
