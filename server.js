// server.js
// Group 15
//
// 3 Dec 2018

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var tableData = require('./tableData');

var app = express();

var port = process.env.PORT || 3034;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
   res.status(200).render('homePage');
});

app.get('/products/:product', function (req, res, next) {
    var product = req.params.product.toLowerCase();
    if (tableData[product]){
        res.status(200).render('productPage', tableData[product]);
    }
//    if (tableData[req.params.n]) {
//        res.status(200).render('./partials/tablePhoto', [tableData[req.params.n], reviewData[req.params.n]]); // z is the template for a single listing.
//    } 
    else {
        next();
    }
});

app.get('*', function (req, res, next) {
   res.status(404).render('404', {});
});

app.listen(port, function () {
   console.log("== Server is listening on port", port);
});
