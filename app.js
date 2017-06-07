// Retrieve
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var date=require('./getDateModule');
// Connect to the db
var url="mongodb://localhost:27017/chat";
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//cross origin supeeort 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	    res.send("connected")

	});
})
app.listen(4200, function () {
  console.log('Example app listening on port 4200!')
})
//post method to get chat response
app.post('/getResponse', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  
	    var qstn=req.body.msg;
	  var query = {"Question":qstn};
	  //console.log(query);
	  db.collection("QuestionCollection").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result)
	    res.send(result)
	    db.close();
	   
	  });
	});
})