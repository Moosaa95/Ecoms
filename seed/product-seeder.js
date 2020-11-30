const Product = require('../models/product')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/myshop", { useNewUrlParser: true })
    .then(() => console.log(" product db connected"))
    .catch(err => console.log(err))


//create new product
const products = [
    new Product({
        imagePath: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=892&q=80',
        title: 'Iphone 12pro',
        description: 'IOS',
        price: 10
    }),
    new Product({
        imagePath: 'https://images.unsplash.com/photo-1586941756923-830029962fd9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvbmVzfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60',
        title: 'motolora',
        description: '1998',
        price: 110
    }),
    new Product({
        imagePath: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60',
        title: 'Mac',
        description: 'laptop',
        price: 30
    }),
    new Product({
        imagePath: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60',
        title: 'toshiba',
        description: 'Laptop',
        price: 1110
    }),
    new Product({
        imagePath: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60',
        title: 'toshiba',
        description: 'Laptop',
        price: 210
    }),
    new Product({
        imagePath: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60',
        title: 'toshiba',
        description: 'Laptop',
        price: 510
    })

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