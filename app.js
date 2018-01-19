const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('mongoose').connection;

const errorHandler = require('./bin/errorHandler');
const logger = new (require('./logger'))();

// mongo
require('./bin/db'); // Инициализация датабазы
const session = require('express-session'); // Сессии
const MongoStore = require('connect-mongo')(session); // Хранилище сессий в монгодб

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'r2d2',
    resave: false, // Пересохранять даже если нету изменений
    saveUninitialized: true, // Сохранять пустые сессии
    store: new MongoStore({ mongooseConnection: db }) // Использовать монго хранилище
}));

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(errorHandler);

module.exports = app;