const express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    app = express();
app.use(express.static('www'));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'www/uploads')
    },
    filename: function (req, file, cb) {
        var type = file.originalname.substring(file.originalname.lastIndexOf('.'));
        file.type = type;
        req.file =file;
        var name = req.cookies.name+type;
        // cb(null,name+'.jpg');
        cb(null, name);
    }
});
var upload = multer({storage: storage});
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.get('', function (req, res) {
    console.log('这是根目录');
});
//用户注册
app.post('/user/register', function (req, res) {
    req.body.ip = req.ip;
    req.body.time = new Date().getTime();
    console.log(req.body);
    var user = req.body;
    if (user.password == user.password01) {
        delete user.password01;
        fs.readFile('users/user.txt', function (err, data) {
            var users = data.toString().trim();
            var comma = users.length > 0 ? ',' : '';
            var usersArr = JSON.parse('[' + users + ']');
            var isIn = usersArr.some(function (ele) {
                return (ele.name == user.name);
            });
            if (isIn) {
                res.status(200).json({"code": "error", "content": "用户名已存在！"})
            } else {
                fs.appendFile('users/user.txt', comma + JSON.stringify(user), function (err) {
                    if (!err) {
                        res.status(200).json({"code": "success", "content": "恭喜注册成功！"})
                    }
                });
            }
        });
    } else {
        res.status(200).json({"code": "error", "content": "两次密码输入不一致！"});
    }
});
//用户登录
app.post('/user/login', function (req, res) {
    var user = req.body;
    fs.readFile('users/user.txt', function (err, data) {
        var users = data.toString().trim();
        var usersArr = JSON.parse('[' + users + ']');
        var isIn = usersArr.some(function (ele) {
            return (user.name == ele.name && user.password == ele.password);
        });
        if (isIn) {
            res.status(200).json({"code": "success", "content": "登陆成功", data: user});
        } else {
            res.status(200).json({"code": "error", "content": "用户名密码错误"});
        }
    });
});

//用户上传头像
app.post('/user/photo', upload.single("photo"), function (req, res) {
    if(req.file.type=='.jpg'){
        res.status(200).json({"code":"success", "content":"头像上传成功！"});
    }else {
        res.status(200).json({"code":"error", "content":"头像上传失败！"});
    }
});

//提交问题
app.post('/user/ask',function (req,res) {
    var user = {};
    //格式IP
    function formatIp(val) {
        val = val=="::1"?"192.168.0.1":val;
        if(val.startsWith("::ffff:")){
            val = val.substr(7);
        }
        return val;
    }
    user.content = req.body.content;
    user.name = req.cookies.name;
    user.ip = formatIp(req.ip);
    user.time = new Date().getTime();
    var txtName = user.time+'.txt';
    fs.appendFile('questions/'+txtName,JSON.stringify(user),function (err) {
        if(err){
            res.status(200).json({"code":"error","content":"提交失败"});
        }else {
            res.status(200).json({"code":"success","content":"提交成功"});
        }
    });
});

//回答问题
app.post('/user/answer',function (req,res) {
    // console.log(req.body);
    //回答的对象
    var answer = req.body;
    answer.ip = req.ip;
    answer.name=req.cookies.name;
    answer.time = new Date().getTime();
    fs.readFile('questions/'+answer.question+'.txt',function (err,data) {
        if(!err){
            //读取问题的对象
            var askObj=JSON.parse(data.toString());
            if((typeof askObj.answer) == 'object'){
                askObj.answer.push(answer);
            }else {
                askObj.answer =[];
                askObj.answer.push(answer);
            }
            fs.writeFile('questions/'+answer.question+'.txt',JSON.stringify(askObj),function (err) {
                if(!err){
                    res.status(200).json({code:"success",content:"回答问题成功！"});
                }
            });
        }

    })
});

//回答列表
app.get('/question',function (req,res) {
    //读取一个目录
    fs.readdir('questions/',function (err,files) {
        var questions = [];
        if (!err){
            files.reverse();
            files.forEach(function (file) {
                fs.readFile('questions/'+file,function (err,data) {
                    if (!err){
                        questions.push(JSON.parse(data.toString()));
                        if(questions.length==files.length){
                            res.status(200).json({code:"success",data:questions});
                        }
                    }
                });
                // questions.push(JSON.parse(fs.readFileSync('questions/'+file).toString()));
            });
        }else {

        }
    });
});
app.listen(80, function () {
    console.log('服务器正常起动');
});
