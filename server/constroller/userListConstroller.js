var mongoose=require('../public/connectDb');

var bodyParser=require('body-parser');

//对数据进行解析
var urlencodedParser=bodyParser.urlencoded({extended:false});

// 创建一个图表
var addUserSchema=new mongoose.Schema({
	motto:String,
	name:String,
	time:String
}); 

var UserList=mongoose.model("UserList",addUserSchema);

module.exports=function(app){
	
	app.use(urlencodedParser);
	app.use(bodyParser.json()); 
	
	
	app.post('/userList',urlencodedParser,function(req,res){
		console.log(req.body)
		if(!req.body) return;
		UserList(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data.body);
		})
	})
	app.get('/userList',function(req,res){
	    
		//查找数据库中是否有数据，{}代表查找整个数据库,Todo操作数据库
	    UserList.find({},function(err,data){
	        if(err) throw err;
	        //把查找到的数据，通过render传递到路由为todo的ejs页面
	        res.json(data);
	    });
	});
	
}
