const router = require('koa-router')();
const ordersModel = require('../mysql/mysql');


const ordersSelect = async (ctx) => {
    await ordersModel.ordersSelect()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "所有订单",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// const ordersSelectByUserId = async(ctx) => {
//     let id = ctx.params.id;

//     await ordersModel.ordersSelectOrderItemSelectByUserId(id)
//         .then(result => {
//             ctx.body = {
//                 status: 200,
//                 msg: "根据用户id查找该用户的所有订单所有的订单项所有的商品",
//                 data: result
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             ctx.body = false;
//         })
// }

const ordersInsertIntoByUserIdPrice = async (ctx) => {
    console.log(ctx.request.body)
    let cartData = ctx.request.body.data;
    let userId = ctx.request.body.userId;
    let allPrice = ctx.request.body.allPrice;
    let d = new Date();
    let ordersName = d.getTime();


    // 生成总订单
    await ordersModel.ordersInsertIntoByUserIdPrice([ordersName, allPrice, userId, new Date(), new Date()])
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "生成订单",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const cartToOrder = async (ctx) => {
    let data = ctx.request.body.data;  //各个商品数据
    let userId = ctx.request.body.userId;  //用户id
    let orderPrice = ctx.request.body.orderPrice;  //总价格
    console.log(data)
    console.log(userId)
    let date = new Date();
    let ordersName = date.getTime();
    let ordersId;
    let res;

    //生成总订单    
    await ordersModel.ordersInsertIntoByUserIdPrice([ordersName, orderPrice, userId, new Date(), new Date()])
        .then(result => {
            res = result;
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })

    //根据总订单的名字编号，找到总订单id
    await ordersModel.ordersSelectByName(ordersName)
        .then(result => {
            ordersId = result[0].orders_id;
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
    //循环生成多个订单item,每个订单item,都有总订单的订单id
    await data.forEach((item, index) => {
        ordersModel.orderItemInsertInto([(ordersName + index), item.goodsData.cart_goods_number, item.goodsData.goods_price, item.goodsData.goods_id, ordersId, new Date(), new Date()])
    })

    //根据订单item的goods_id,删除购物车中对应的商品
    await data.forEach(item => {
        ordersModel.cartDelectByGoodsId([item.goodsData.goods_id])
    })
    
    // ctx.body = {
    //     status: 200,
    //     msg: "生成订单",
    //     data: res
    // }
}

module.exports = {
    ordersSelect: ordersSelect,
    ordersInsertIntoByUserIdPrice: ordersInsertIntoByUserIdPrice,
    cartToOrder: cartToOrder
}