var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Yelp = require('yelp');
var request = require('request');

var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Hello' });
});

router.get('/restaurant/:name', function(req, res) {

    var biz = req.params.name.toLowerCase();

    biz = biz.split(' ').join('-');

    console.log(biz);
    var yelp = new Yelp({
        consumer_key: config.getConsumerKey(),
        consumer_secret: config.getConsumerSecret(),
        token: config.getToken(),
        token_secret: config.getTokenSecret()
    });

    yelp.business(biz, function(err, data) {
        if (err) return console.log(error);
            res.status(200).json(data.reviews);
    });

});

app.use('/api', router);

app.listen(port);
console.log("Stared on "+port);