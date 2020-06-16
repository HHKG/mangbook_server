//逻辑处理文件todoConstroller
var bodyParser=require('body-parser');

//引入mongoose模块；
var mongoose=require('mongoose');

//连接数据库
mongoose.connect('mongodb+srv://todoapp:todoapp@cluster0-w2o0w.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology: true,useNewUrlParser: true})

//创建一个图表
var todoSchema=new mongoose.Schema({
    item:String
});

//往数据库中存储数据
var Todo=mongoose.model('Todo',todoSchema);

//测试数据库存储
// Todo({item:'Hello Everyone!'}).save(function(err,data){
//     if(err) throw err;
//     console.log('Item saved');
// })

//对数据进行解析
var urlencodedParser=bodyParser.urlencoded({extended:false});

// var data=[
//     {item:'欢迎大家来到蓝鸥课堂！'},
//     {item:'希望大家能够喜欢我们的课程！'},
//     {item:'在课程中能够学到真正的知识！'},
// ];

module.exports=function(app){
	//浏览器地址输入：localhost:3000/todo时执行这里的函数
    app.get('/todo',function(req,res){
		
        //查找数据库中是否有数据，{}代表查找整个数据库
        Todo.find({},function(err,data){
            if(err) throw err;
            //把查找到的数据，通过render传递到路由为todo的ejs页面
            res.json(data);
        });
    });

    //传递数据(获取页面传递过来的信息，存储到数据库里面去)
    app.post('/todo',urlencodedParser,function(req,res){
		console.log(req.body)
        Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data.body);//把数据回调给成功回调函数
        });
    });

    //删除数据
    app.delete('/todo/:item',function(req,res){
         Todo.find({item:req.params.item}).remove(function(err,data){
             if(err) throw err;
             res.json(data);
         });
    //      data=data.filter((todo)=>{
    //         return todo.item!==req.params.item;
    //     });
    // //     给成功函数返回对应的数据
    //     res.json(data);
    });
}