var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/", function (req, res) {
        res.redirect("/index.html");
});

app.get("/getMapStyles", function(req, res) {
    var link = "https://snazzymaps.com/explore.json?key=6be9b8a9-d73a-4522-9c19-a829d369ca61";

    readURL(link, function(data) {
        res.send(data); //send response body
    });
});

app.get("/geocodeAddress", function(req, res) {
    var address = req.query.address;
    var link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBROgL2XHREjG9AFlELb5e4VmXx5xfoqMk";
        
    readURL(link, function(data) {
        res.send(data); //send response body
    });
});

function readURL(url, cb) {
    var data = "";
    var protocol = url.split("://")[0];
    var request = require(protocol).get(url, function(res) {
        res.on("data", function(chunk) {
            data += chunk;
        });

        res.on("end", function() {
            cb(data);
        })
    });

    request.on("error", function(e) {
        console.log("Got error: " + e.message);
    });
}

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);

app.listen(port);
