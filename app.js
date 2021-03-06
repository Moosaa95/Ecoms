const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/* const bodyparser = require('body-parser') */
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport') // for user management authentication
const flash = require('connect-flash')
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session)

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//connect to the data
mongoose.connect("mongodb://localhost:27017/myshop", { useNewUrlParser: true })
    .then(() => console.log("db connected"))
    .catch(err => console.log(err))
require('./config/passport')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
/* app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json()) */
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // replaced bodyparser
app.use(validator())
app.use(cookieParser());
app.use(session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: false,
        //no new connection open on it own
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        //time for cookies to expire
        cookie: { maxAge: 180 * 60 * 1000 }
    })) //if true session saved on the server on it request
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated()
        //accessing sessions globally
    res.locals.session = req.session
    next()
})

app.use('/users', usersRouter);
app.use('/', indexRouter);

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