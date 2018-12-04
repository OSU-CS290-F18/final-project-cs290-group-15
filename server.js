// server.js
// Group 15
//
// 3 Dec 2018

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var listingData = require('./x'); // x is the file that contains the data for the listings.
var reviewData = require('./reviewData');
var app = express();
var port = process.env.PORT || 3034;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res, next) {
   res.status(200).render('y', listingData.concat(reviewData)); // y is the view template for the index page.
});

app.get('/y/:n', function (req, res, next) {
    if (postData[req.params.n]) {
        res.status(200).render('z', postData[req.params.n]); // z is the template for a single listing.
    } else {
        next();
    }
});

app.get('*', function (req, res, next) {
   res.status(404).render('404', {});
});

app.listen(port, function () {
   console.log("== Server is listening on port", port);
});
