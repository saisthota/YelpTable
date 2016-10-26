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

router.get('/restaurant/:name/:area', function(req, res) {

    var biz = req.params.name.toLowerCase();
    var area = req.params.area.toLowerCase();

    biz = biz.split(' ').join('-');
    biz = biz.split('---').join('-');
    biz = biz.split("'").join("");

    area = area.split(' ').join('-');
    area = area.split('---').join('-');
    area = area.split("'").join("");
    biz = biz + '-' + area;

    console.log(biz);
    
    var yelp = new Yelp({
        consumer_key: config.getConsumerKey(),
        consumer_secret: config.getConsumerSecret(),
        token: config.getToken(),
        token_secret: config.getTokenSecret()
    });

    yelp.business(biz, function(err, data) {
        if (err) return console.log(error);

            var response = [];
            var i = 0;
            var row = "";

            for(i=0; i<data.reviews.length; i++) {
                row = "<img src='"+data.reviews[i].rating_image_url+"' title='"+data.reviews[i].user.name+" rated "+data.reviews[i].rating+" stars'><br>";
                row += "<div style='width:20%'><img src='"+data.reviews[i].user.image_url+"' style='float:left;width:50px;height:50px;margin-right:10px'></div>";
                row += "<div style='width:80%'><b>"+data.reviews[i].user.name+"</b><br>"+data.reviews[i].excerpt+"</div>";
                row = row.split('\n').join(' ');
                response.push(row);
            }
            console.log(response);
            res.status(200).json(response);
    });

});

app.use('/api', router);

app.listen(port);
console.log("Stared on "+port);