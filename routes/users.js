const express = require('express');
const passport = require('passport')
const Product = require('../models/product')
const csrf = require('csurf')
const router = express.Router();


const csrfProtection = csrf()


router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile')
})


router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout()
    res.redirect('/')
})


router.use('/', notLoggedIn, function(req, res, next) {
    next()
})
router.use(csrfProtection)
    /* GET users listing. */
router.get('/signup', function(req, res, next) {
    const messages = req.flash('error')
    res.render('signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}))

router.get('/signin', function(req, res, next) {
    const messages = req.flash('error')
    res.render('signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
}))


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}