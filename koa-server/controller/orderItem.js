const router = require('koa-router')();
const orderItemModel = require('../mysql/mysql');


const orderItemSelect = async(ctx) => {
    await orderItemModel.orderItemrSelect()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "所有订单项",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// const orderItemSelectByUserId = async(ctx) => {
//     let id = ctx.params.id;
//     await orderModel.orderSelectByUserId(id)
//         .then(result => {
//             ctx.body = {
//                 status: 200,
//                 msg: "根据用户id查找该用户的所有订单",
//                 data: result
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             ctx.body = false;
//         })
// }

const orderItemInsertInto = async(ctx) => {
    console.log(ctx.request.body)
    let d = new Date();
    let userId = ctx.request.body.userId;
    //订单项
    let goodsId = ctx.request.body.goodsId;
    let goodsPrice = ctx.request.body.goodsPrice;
    let goodsNumber = ctx.request.body.goodsNumber;
    let orderItemName = d.getTime();
    // 订单
    let ordersName = d.getTime() + 1;
    let ordersPrice = goodsNumber * goodsPrice;
    let ordersId;

    await orderItemModel.cartUpdateById(userId, goodsId)

    await orderItemModel.ordersInsertInto([ordersName, ordersPrice, userId, new Date(), new Date()])

    await orderItemModel.ordersSelectByName(ordersName)
        .then(result => {
            // console.log("订单id" + result[0].orders_id)
            // console.log("订单名查询" + JSON.stringify(result))
            ordersId = result[0].orders_id;
        })

    await orderItemModel.orderItemInsertInto([orderItemName, 1, goodsPrice, goodsId, ordersId, new Date(), new Date()])
        .then(result => {
            ctx.body = {
                state: 200,
                msg: "插入成功",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

module.exports = {
    orderItemSelect: orderItemSelect,
    orderItemInsertInto: orderItemInsertInto
}