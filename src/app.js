const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../src/views/'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));

// Routes
var indexRouter = require('./routes/indexRoutes');
var usersRouter = require('./routes/usersRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const moviesApiRoutes = require('./routes/moviesApiRoutes');

// Route Middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);
app.use('/api/movies', moviesApiRoutes);

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
