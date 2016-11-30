var express = require('express');
var router = express.Router();
var mongo=require("mongodb");
var multipart = require('connect-multiparty');
var fs = require("fs");
var multipartMiddleware = multipart();

//var port=mongo.Connection.DEFAULT_PORT;
var host="localhost";
var server=new mongo.Server(host,27017,{auto_reconnect:true});//创建数据库所在的服务器服务器
var db=new mongo.Db("node",server,{safe:true});//创建数据库对象
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('controler', {title:'zfxmnb'});
});
router.post('/',multipartMiddleware,function(req,res,next){
	res.setHeader('content-type','text/html;charset=UTF-8');

});
 
module.exports = router;
