const router = require('koa-router')();
const goodsCategoryModel = require('../mysql/mysql');


const goodsCategorySelect = async(ctx) => {
    await goodsCategoryModel.goodsCategorySelect()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "所有商品分类",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

module.exports = {
    goodsCategorySelect: goodsCategorySelect
}