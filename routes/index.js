const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const Cart = require('../models/cart')







/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs) {
        const productChunks = [] //to be able to through
        const chunkSize = 3
        for (let i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize))
        }
        res.render('index', { title: 'Shopping cart', products: productChunks });
    })

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