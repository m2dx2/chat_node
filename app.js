// Retrieve
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var date=require('./getDateModule');
// Connect to the db
var url="mongodb://localhost:27017/chat";
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
//cross origin supeeort 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
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
app.use(bodyParser());

app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});
//post method to get chat response
app.post('/getResponse', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  
	    console.log(req.body);
	  var query = {};
	  db.collection("QuestionCollection").find().toArray(function(err, result) {
	    if (err) throw err;
	    res.send(result[0].Question)
	    db.close();
	   
	  });
	});
})