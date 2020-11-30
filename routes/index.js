const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const Cart = require('../models/cart')







/* GET home page. */
router.get('/', function(req, res, next) {
    const successMsg = req.flash('success')[0];
    Product.find(function(err, docs) {
        console.log(docs.length);
        res.render('index', {
            title: 'Shopping Cart',
            products: docs,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    });

});

router.get('/add-to-cart/:id', function(req, res, next) {
    const productId = req.params.id
        //create new cart each time a new item is added
    const cart = new Cart(req.session.cart ? req.session.cart : {})

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/')
        }
        cart.add(product, product.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/');
    })

})
router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shopping-cart', { products: null })
    }
    const cart = new Cart(req.session.cart)
    res.render('shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })
})
router.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('checkout', { products: null })
    }
    const cart = new Cart(req.session.cart)
    res.render('checkout', { totalPrice: cart.totalPrice })
})

module.exports = router;