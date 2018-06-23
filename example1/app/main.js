"use strict"
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('../routes/index');
var adminRouter = require('../routes/admin');
var usersRouter = require('../routes/users');

var app = express();

// view engine setup
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);

// Ошибки со стороны пользователя
app.use(function(req, res, next) {
  next(createError(404));
});

// Ошибки со стороны сервера
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.sendStatus(err.status || 500);
  console.error(err);
});

module.exports = app
