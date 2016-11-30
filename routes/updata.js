var express = require('express');
var router = express.Router();
var mongo=require("mongodb");
var fs = require("fs");
var path = require('path');
/* GET home page. */
var host="localhost";
var server=new mongo.Server(host,27017,{auto_reconnect:true});//创建数据库所在的服务器服务器
var db=new mongo.Db("node",server,{safe:true});//创建数据库对象

router.post('/',function(req,res,next){
    db.open(function (err,db) {
	    db.collection("pageinfo",function(err,collection){
	    	if(err) throw err;
	        else{	
	        		if(req.body.page&&req.body.layoutSave&&req.body.pln&&req.body.plc){
			        	var data=req.body.layoutSave;
			        	var page=req.body.page;
			        	collection.find({page:page}).toArray(function(err,docs){
			        		if(err) throw err;
			        		else{//console.log(docs)
			        			if(docs.length>0){
			        				collection.update({page:page},{$set:{pageData:data}},function(err,result){});
			        			}else{
			        				collection.save({page:page,pageData:data},function(err,result){});
			        			}
			        			var fdata=JSON.parse(data);
			        			var fstring="";
			        			if(fdata[1].length>0){
									console.log(fdata[1][0].layoutId+";"+fdata[1][0].layoutName);
									for(var key in fdata[1]){
										fstring=fstring+"<% var layoutId='"+fdata[1][key].layoutId+"'%>";
										fstring=fstring+"<% include ./layout/"+fdata[1][key].layoutName+".ejs%>";
									}
									fs.writeFile(path.resolve(__dirname, "../views")+"\\layout.ejs",fstring,function(err){});
									fs.writeFile(path.resolve(__dirname, "../views")+"\\page\\"+req.body.pln+".ejs",req.body.plc,function(err){});
				        			res.end(JSON.stringify({success:true}));
				        			db.close();
			        			}else{
			        				fs.writeFile(path.resolve(__dirname, "../views")+"\\layout.ejs"," ",function(err){});
			        				fs.writeFile(path.resolve(__dirname, "../views")+"\\page\\"+req.body.pln+".ejs",req.body.plc,function(err){});
			        				res.end(JSON.stringify({success:true}));
			        				db.close();
			        			}
			        		}
	 		        	});
		        	}else{

		        	}
 		        	
		        }
	    });
	});
});
 
module.exports = router;
