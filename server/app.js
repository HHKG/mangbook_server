//入口文件

var express=require('express');

//引入逻辑处理模块todoConstroller
var todoConstroller=require('./constroller/todoConstroller');
var userListConstroller=require('./constroller/userListConstroller');

var app=new express();//实例化express对象

// 解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.set('view engine','ejs');//设置一个视图引擎，否则不能用ejs

app.use(express.static('public'));//public文件夹是存放一些公共样式的，要这样定义才可以使用

//把app这个对象传过todoController这个文件里面，进行逻辑处理
todoConstroller(app);

userListConstroller(app);

app.listen(3000);