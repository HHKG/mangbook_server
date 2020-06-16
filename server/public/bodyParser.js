var bodyParser=require('body-parser');

//对数据进行解析
var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=urlencodedParser;