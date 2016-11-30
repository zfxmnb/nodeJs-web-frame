var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var fs = require("fs");
var multipartMiddleware = multipart();

/* GET home page. */
router.post('/',multipartMiddleware,function(req,res,next){
	//res.setHeader('Access-Control-Allow-Origin',"*");
	res.setHeader('content-type','text/html;charset=UTF-8');

	//上传刷新图片列表
	if(req.body.reloadImg){
		var currData=fs.readdirSync("public/images/");
		//console.log(currData);
		var jsonData={images:currData};
		res.end(JSON.stringify(jsonData));
	}

	//删除图片
	if(req.body.removeImg){
		var exists=fs.existsSync("public"+req.body.removeImg);
		if(exists)
		var err=fs.unlinkSync("public"+req.body.removeImg);
		if(err){throw err}
		res.end(JSON.stringify({success:true}));
	}
	//console.log(req.files)
	//上传图片
	if(req.files.imgData){
	   fs.readFile(req.files.imgData.path, function(err, data){
	   	var imgType=req.files.imgData.type.split("/")[1];
	   	if(req.body.imgName){
	   		var imgName=req.body.imgName+"."+imgType;
	   	}else{
	   		var imgName=req.files.imgData.name;
	   	}
	   var newPath = "public/images/"+imgName;
		    fs.writeFile(newPath, data, function(err){
		        if(err) throw err;
		        else{
		        	res.send({success:"ok"});
		        }
		    });
		});
    }
    if(req.files.upfile){
    	var upfile=req.files.upfile;
	   fs.readFile(upfile.path, function(err, data){
	   	var type="."+upfile.name.split(".")[1];
	   	var size=upfile.name.size;
	   	var imgName=upfile.name;
	   var newPath = "public/images/"+imgName;
		    fs.writeFile(newPath, data, function(err){
		        if(err) throw err;
		        else{
		        	var string='{"original":"'+imgName+'","name":"'+imgName+'","url":"/images/'+imgName+'","size":"'+size+'","type":"'+type+'","state":"SUCCESS"}'
		        	res.send(string);
		        }
		    });
		});
    }
});
 
module.exports = router;
