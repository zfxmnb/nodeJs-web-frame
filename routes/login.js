var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var fs = require("fs");
var multipartMiddleware = multipart();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(req.query);
});
router.post('/',multipartMiddleware,function(req,res,next){
		var name=pp1.split("**")[0];
		var imgdata=pp1.split("**")[1];
		var imgtype=imgdata.match(/data:image(\S*);base64,/);
        var b64=req.body.pp1.replace(/^data:image\/\w+;base64,/,"");
        var dataBuffer=new Buffer(b64,"base64");
        fs.writeFile("public/images/"+name,dataBuffer);
        //res.render('index', { img:'<img src="'+req.body.pp1+'">' });
        res.send("<h1>上传成功</h1>")
})
module.exports = router;
