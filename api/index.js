var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var oauth   = require('oauth-signature');
var nonce  = require('nonce')();
var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Hello' });
});

router.get('/restaurant/:name', function(req, res) {

    var url = 'http://api.yelp.com/v2/search';

    var def_params = {
        location: 'San+Francisco',
        sort: '2'
    };

    var req_params = {
        oauth_consumer_key: config.getConsumerKey(),
        oauth_token: config.getToken(),
        oauth_nonce: nonce(),
        oauth_timestamp: nonce().toString().substr(0, 10),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0'
    };

    var params = _.assign(def_params, set_parameters, req_params);

    var cosumerSecret = config.getConsumerSecret();
    var tokenSecret = config.getTokenSecret();

    var signature = oauth.generate('GET', url, params, consumerSecret, tokenSecret, {encodeSignature: false});

    params.oauth_signature = signature;

    var paramsURL  = qs.stringify(params);




});

app.use('/api', router);

app.listen(port);
console.log("Stared on "+port);