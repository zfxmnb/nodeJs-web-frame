var express = require('express');
var router = express.Router();
var mongo=require("mongodb");
var fs = require("fs");
/* GET home page. */
var host="localhost";
var server=new mongo.Server(host,27017,{auto_reconnect:true});//创建数据库所在的服务器服务器
var db=new mongo.Db("node",server,{safe:true});//创建数据库对象

router.get('/', function(req, res, next) {
	db.open(function (err,db) {
	    db.collection("pageinfo",function(err,collection){
	        if(err) throw err;
	        else{
	        	collection.find({page:"index"}).toArray(function(err,docs){
	        		console.log(JSON.parse(docs[0].pageData));
	  				res.render('index',{data:JSON.parse(docs[0].pageData)});
	  			});
	  		}
	  	});
	});
});

module.exports = router;
