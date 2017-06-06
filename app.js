// Retrieve
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var date=require('./getDateModule');
// Connect to the db
var url="mongodb://localhost:27017/chat";
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = {};
	  db.collection("QuestionCollection").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    db.close();
	   
	  });
	});
})
app.listen(4200, function () {
  console.log('Example app listening on port 4200!')
})
// http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("Getting data by function "+getData()+" \n on date "+date.myDateTime());
    // res.end();
// }).listen(4200);

// function getData(){
	// MongoClient.connect(url, function(err, db) {
	  // if (err) throw err;
	  // var query = {};
	  // db.collection("QuestionCollection").find(query).toArray(function(err, result) {
	    // if (err) throw err;
	    // // result.forEach(function(value){
	    // // 	console.log(value.Qes+" "+value.ans);
	    // // })
	    // console.log("in fun "+result[0].answer);
	    // db.close();
	    // return result[0].answer;
	  // });
	// });
// }
