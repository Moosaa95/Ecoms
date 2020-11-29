const Product = require('../models/product')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/shopping", { useNewUrlParser: true })
    .then(() => console.log(" product db connected"))
    .catch(err => console.log(err))


//create new product
const products = [
    new Product({
        imagePath: 'http://www.billboard.com/files/styles/article_main_image/public/media/19-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        title: 'Television',
        description: 'Sony Tele',
        price: 10
    }),
    new Product({
        imagePath: 'http://www.billboard.com/files/styles/article_main_image/public/media/19-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        title: 'Television',
        description: 'Sony Tele',
        price: 10
    }),
    new Product({
        imagePath: 'http://www.billboard.com/files/styles/article_main_image/public/media/19-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        title: 'Television',
        description: 'Sony Tele',
        price: 10
    }),
    new Product({
        imagePath: 'http://www.billboard.com/files/styles/article_main_image/public/media/19-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        title: 'Television',
        description: 'Sony Tele',
        price: 10
    }),
    new Product({
        imagePath: 'http://www.billboard.com/files/styles/article_main_image/public/media/19-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        title: 'Television',
        description: 'Sony Tele',
        price: 10
    }),
    new Product({
        imagePath: 'http://www.billboard.com/files/styles/article_main_image/public/media/19-beyonce-lemonade-screenshot-2016-billboard-650.jpg',
        title: 'Television',
        description: 'Sony Tele',
        price: 10
    }),
]

//storing the products in the database

let done = 0
for (let i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++
        if (done === products.length) {
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}