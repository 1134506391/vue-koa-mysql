const router = require('koa-router')();
const goodsModel = require('../mysql/mysql');
const multer = require('koa-multer');
const goodsServer = require('../service/goods.js');


const goodsSelect = async(ctx) => {
    let result = await goodsServer.goodsSelect();
    ctx.body = {
        status: 200,
        msg: "所有商品123",
        data: result,
        code:200
    }
    // await goodsModel.goodsSelect()
    //     .then(result => {
    //         ctx.body = {
    //             status: 200,
    //             msg: "所有商品",
    //             data: result
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         ctx.body = false;
    //     })
}

const goodsSelectByShopId = async(ctx) => {
    let id = ctx.params.id;
    // let id = 1;
    await goodsModel.goodsSelectByShopId(id)
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "根据店铺id查找店铺所有商品",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const goodsSelectById = async(ctx) => {
    let id = ctx.params.id;
    await goodsModel.goodsSelectById(id)
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "根据商品id查找该商品的所有信息",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// 商品模糊查询
const goodsSearchByIdOrName = async(ctx) => {
    console.log(ctx.query)
    let idName = ctx.query.idName;
    await goodsModel.goodsSearchByIdOrName(idName)
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "商品模糊查询",
                data: result,
                length:result.length
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const goodsDeleteById = async(ctx) => {
    let id = ctx.params.id;
    await goodsModel.goodsDeleteById(id)
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "根据商品id删除该商品",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// 商品增加
const goodsInsertInto = async(ctx, next) => {
    var storage = multer.diskStorage({
            //文件保存路径  
            destination: function(req, file, cb) {
                cb(null, 'static/images/goods')
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
            console.log(data)
            userAvator = ctx.req.file.filename;
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
    await goodsModel.goodsInsertInto([data.goodsName, data.goodsDesc, userAvator, parseInt(data.goodsPrice), parseInt(data.goodsNumber), data.goodsShopId, new Date(), new Date()])
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

//商品修改
const goodsUpdate = async(ctx, next) => {
    var storage = multer.diskStorage({
            //文件保存路径  
            destination: function(req, file, cb) {
                cb(null, 'static/images/goods')
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
            console.log(data)
            userAvator = ctx.req.file.filename;
            console.log(userAvator)
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
    await goodsModel.goodsUpdate([data.goodsName, data.goodsDesc, userAvator, parseInt(data.goodsPrice), parseInt(data.goodsNumber), new Date(), data.goodsId])
        .then(result => {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: result,
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
}



module.exports = {
    goodsSelect: goodsSelect,
    goodsSelectByShopId: goodsSelectByShopId,
    goodsSelectById: goodsSelectById,
    goodsSearchByIdOrName:goodsSearchByIdOrName,
    goodsDeleteById: goodsDeleteById,
    goodsInsertInto: goodsInsertInto,
    goodsUpdate: goodsUpdate
}