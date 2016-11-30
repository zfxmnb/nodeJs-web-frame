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
	db.open(function (err,db) {
	    db.collection("custominfo",function(err,collection){
	    	if(err) throw err;
	        else{
	        	collection.find({customid:req.query.tn}).toArray(function(err,docs){
	        		if(err) throw err;
	        		else{
	        			if(docs.length>0){
	        				res.render('custom', {title:'zfxmnb',data:docs[0]});
	        			}
	        			else{
	        				res.render('custom', {title:'zfxmnb',data:{customcon:"没有页面信息"}});
	        			}
	        		}
	        	})
	        }
	    });
	});
  	
});
router.post('/',multipartMiddleware,function(req,res,next){
	res.setHeader('content-type','text/html;charset=UTF-8');
	db.open(function (err,db) {
	    db.collection("custominfo",function(err,collection){
	    	if(err) throw err;
	        else{	
	        		var customId=req.body.customid;
	        		if(req.body.customcon){
					collection.find({customid:customId}).toArray(function(err,docs){
		        		if(err) throw err;
		        		else{
		        				var customCon=req.body.customcon;
		        				var customName=req.body.customname;
			        			if(docs.length>0){
			        				collection.update({customid:customId},{$set:{customname:customName,customcon:customCon}},function(err,result){});
			        			}else{
			        				collection.save({page:"custom",customid:customId,customname:customName,customcon:customCon},function(err,result){});
			        			}
			        			res.end(JSON.stringify({success:true}));	
		        				db.close();
		        		}
	 		        });
	 		        }else if(req.body.pull){
		 		        collection.find({page:"custom"}).toArray(function(err,docs){
			        		if(err) throw err;
			        		else{//console.log(docs)
			        			res.end(JSON.stringify({success:true,data:docs}));
			        			db.close();
			        		}
		 		        });
	 		        }else if(req.body.remove&&req.body.removeCustomid){
	 		        	 collection.remove({customid:req.body.removeCustomid},function(err,docs){
			        		if(err) throw err;
			        		else{//console.log(docs)
			        			res.end(JSON.stringify({success:true}));
			        			db.close();
			        		}
		 		        });
	 		        }
				}
			
		});
	});
});
 
module.exports = router;
