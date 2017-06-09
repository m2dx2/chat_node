var http=require('http')
var url=require('url')
var express=require('express')
var app=express()
var fs=require('fs')
app.listen(4200,function(){
	console.log("listening test")
})

app.get("/",function(req,res){
	fs.readFile('test.html',function(err,data){
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
	})
})