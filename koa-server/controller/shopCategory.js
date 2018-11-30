const router = require('koa-router')();
const shopCategoryModel = require('../mysql/mysql');


const shopCategorySelect = async(ctx) => {
    await shopCategoryModel.shopCategorySelect()
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
    shopCategorySelect: shopCategorySelect
}