
// 连接数据库
var mongoose=require('../public/connectDb');

// 引入body-parser对数据经进行解析
var bodyParser=require('body-parser');

var urlencodedParser=bodyParser.urlencoded({extended:false});

var registerUserSchema= new mongoose.Schema({
	username:String,
	password:String
})


// 在数据库里创建图表
var registerUser=mongoose.model('registerUser',registerUserSchema);


// 导出函数，目的是为了把这里的逻辑导入app.js里执行express框架的一些api;
module.exports=function (app){
	// 解析调用express的post时传过来的数据
	app.use(urlencodedParser);
	app.use(bodyParser.json());
	
	app.post('/RegisterUser',urlencodedParser,function(req,res){
		if(!req.body) return;
	   registerUser(req.body).save(function(err,data){
			if(err) throw err;
			res.write('success')
		    res.json(data.body);
		})
	})
	
	app.post("/GetUser",function(req,res){
		if(!req.body) return;
		console.log(req.body);
		registerUser.find(req.body,function(err,data){
			if(err) throw err;
			res.json(data.body);
		})
	})
	
}