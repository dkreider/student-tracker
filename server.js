var express = require("express");
var bodyParser = require("body-parser");

require ("./api/data/db.js");
var router = require("./api/routes")

var app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(function(req, res, next) {

    console.log(req.method, req.url);
    next();

});

app.use("/api", router);

app.listen(3000, function() {

    console.log("Listening on port 3000.")

});
