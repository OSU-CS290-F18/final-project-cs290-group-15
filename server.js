// server.js
// Group 15
//
// 3 Dec 2018

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var tableData = require('./tableData');

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;

console.log(mongoURL);

var mongoDB = null;

var app = express();

var port = process.env.PORT || 3034;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res, next) {
   res.status(200).render('homePage');
});

app.get('/products/:product', function (req, res, next) {
    var product = req.params.product.toLowerCase();
    var productCollection = mongoDB.collection('products');
    productCollection.find({ productId: product }).toArray(function (err, productDocs) {
    if(err) {
        res.status(500).send("Error connecting to DB");
    } else if ( productDocs.length > 0) {
        res.status(200).render('productPage', productDocs[0]);
    } else {
        next();
    }
    })
});

app.post('/products/:product/addReview', function(req, res, next) {
    var product = req.params.product.toLowerCase();
    
    if(req.body && req.body.reviewName && req.body.review) {
        var reviewObj = {
            reviewName: req.body.reviewName,
            review: req.body.review
        };
        var productCollection = mongoDB.collection('products');
        productCollection.updateOne(
            {productId: product},
            {$push: { reviews: reviewObj }},
            function (err, result) {
                if (err) {
                    res.status(500).send("Error submitting review data");
                } else if (result.matchedCount > 0) {
                    res.status(200).send("Sucess")
                } else {
                    next();
                }
            }
        );
    } else {
        res.status(400).send("All fields need to be filled in.");
    }
})

app.get('*', function (req, res, next) {
   res.status(404).render('404', {});
});

MongoClient.connect(mongoURL, function (err, client) {
    if (err){
        throw err;
    }
    mongoDB = client.db(mongoDBName);
    app.listen(port, function () {
        console.log("== Server is listening on port", port);
    });
});
