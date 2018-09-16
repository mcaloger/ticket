// express
let express = require('express');

// middleware
let createError = require('http-errors');
let logger = require('morgan');
let helmet = require('helmet');
let bodyParser = require('body-parser');

// setup app
let app = express();

// apply middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(helmet());

//routes
// serve frontend
let indexRouter = require('./routes/index');
app.use('/', indexRouter);
// tickets CRUD
let ticketsRouter = require('./routes/tickets');
app.use('/api/v1/tickets', ticketsRouter);
// users
let usersRouter = require('./routes/users');
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
