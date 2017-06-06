// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var url="mongodb://localhost:27017/chat";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var query = {};
  db.collection("mycol").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});