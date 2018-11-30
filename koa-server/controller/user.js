const router = require('koa-router')();
const userModel = require('../mysql/mysql');
const multer = require('koa-multer');
const util = require('../util/util');


const userInsertInto = async(ctx, next) => {
    var storage = multer.diskStorage({
            //文件保存路径  
            destination: function(req, file, cb) {
                cb(null, 'static/images/')
            },
            //修改文件名称  
            filename: function(req, file, cb) {
                var fileFormat = (file.originalname).split(".");
                cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        })
        //加载配置  
    var upload = multer({ storage: storage }).single('file');
    var data;
    var userAvator;
    await upload(ctx)
        .then(result => {
            data = JSON.parse(ctx.req.body.data);
            userAvator = ctx.req.file.filename;
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
    await userModel.userInsertInto([data.userName, data.userPassword, userAvator, data.userPhone, "深圳", new Date(), new Date()])
        .then(result => {
            ctx.body = {
                code: 200,
                msg: '插入成功',
                data: result,
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
}




// 查找所有用户
const userSelect = async(ctx) => {
    await userModel.userSelect()
        .then(result => {
            ctx.body = {
                code: 200,
                msg: '所有信息',
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// 月份注册用户统计
const userSelectCountByMonth = async(ctx) => {
    await userModel.userSelectCountByMonth()
        .then(result => {
            ctx.body = {
                code: 200,
                msg: '月份注册用户统计',
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}


// 登录
const userLogin = async(ctx) => {
    // console.log(ctx.request.body)
    let userName = ctx.request.body.userName;
    let userPassword = ctx.request.body.userPassword;


    await userModel.userSelectByName(userName)
        .then(result => {
            console.log(result)
            if (userName == result[0].user_name && userPassword == result[0].user_password) {
                ctx.body = {
                    state: 200,
                    msg: '账号密码正确，登录成功',
                    data: result
                }
            } else {
                ctx.body = {
                    state: 201,
                    msg: '账号密码错误，登录失败',
                    data: result
                }
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
}

module.exports = {
    userSelect: userSelect,
    userSelectCountByMonth:userSelectCountByMonth,
    userInsertInto: userInsertInto,
    userLogin: userLogin
}