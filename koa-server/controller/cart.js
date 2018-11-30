const router = require('koa-router')();
const cartModel = require('../mysql/mysql');


const cartSelect = async(ctx) => {
    await cartModel.cartSelect()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "购物车所有数据",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// const cartSelectGroupByUserId = async(ctx) => {
//     let userId;
//     // let id = ctx.params.id;
//     let shopId;
//     let shopName;
//     let goodsId;
//     let arrData = [];

//     await cartModel.cartSelectByUserId(1)
//         .then(result => {
//             goodsId = result[0].goods_id;
//             goodsNumber = result[0].cart_goods_number;
//         })
//     await cartModel.goodsSelect()
//         .then(result => {
//             goodsName = result[0].shop_name;
//             shopId = result[0].shop_id;
//         })
//     await cartModel.shopSelectNameById(shopId)
//         .then(result => {
//             shopName = result[0].shop_name;
//             arrData.push({
//                 shopId: shopId,
//                 shopName: shopName,
//                 goodsList: [{
//                     goodsId: JSON.(goodsId),
//                     goodsName: JSON.stringify(goodsName),
//                     goodsNumber: JSON.stringify(goodsNumber)
//                 }]

//             })
//             console.log(arrData)
//         })


//     .catch(error => {
//         console.log(error);
//         ctx.body = false;
//     })
// }

const cartSelectGroupByUserId = async(ctx) => {
    let id = ctx.params.id;
    await cartModel.cartSelectGroupByUserId(id)
        .then(result => {

            ctx.body = {
                status: 200,
                msg: "查询购物车数据",
                data: arrFn(result)
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}




const cartUserGoodsSelect = async(ctx) => {
    let id = ctx.params.id;
    await cartModel.cartUserGoodsSelect(id)
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "根据用户id,商品id查看所有数据",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}




const cartInsertInto = async(ctx) => {
    console.log(ctx.request.body)
    let goodsId = ctx.request.body.goodsId;
    let cartGoodsNumber = ctx.request.body.goodsNumber;
    let userId = ctx.request.body.userId;
    await cartModel.cartInsertInto([userId, goodsId, cartGoodsNumber, new Date(), new Date()])
        .then(result => {
            ctx.body = {
                state: 200,
                msg: "插入购物车成功",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const cartInsertIntos = async(ctx) => {
    // console.log(ctx.request.body)
    // let goodsId = ctx.request.body.goodsId;
    // let cartGoodsNumber = ctx.request.body.goodsNumber;
    // let userId = ctx.request.body.userId;
    let arr1 = [
        [1, 1, 1, "2018-06-26T09:03:49.000Z"],
        [1, 2, 1, "2018-06-26T09:03:49.000Z"],
        [1, 3, 1, "2018-06-26T09:03:49.000Z"]
    ]
    await cartModel.cartInsertIntos(arr1)
        .then(result => {
            ctx.body = {
                state: 200,
                msg: "插入购物车成功",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

// 单个删除
const cartDelectById = async(ctx) => {
        let id = 1;
        await cartModel.cartDelectById([id])
            .then(result => {
                ctx.body = {
                    state: 200,
                    msg: "删除购物车成功",
                    data: result
                }
            })
            .catch(error => {
                console.log(error);
                ctx.body = false;
            })
    }
    // 多个删除
const cartDelectByIds = async(ctx) => {
    let ids = [1, 2, 3];
    await cartModel.cartDelectByIds(ids)
        .then(result => {
            ctx.body = {
                state: 200,
                msg: "删除购物车成功",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}


// 支付


const cartToPay = async(ctx) => {
    console.log(ctx.request.body)
    let goodsId = ctx.request.body.goodsId;
    let allPrice = ctx.request.body.allPrice;
    let goodsNumber = ctx.request.body.goodsNumber;
    let userId = ctx.request.body.userId;
    let d = new Date();
    let ordersName = d.getTime();
    let orderItemName = d.getTime();

    await cartModel.cartDeleteById(userId, goodsId)

    await cartModel.ordersInsertInto([ordersName, ordersPrice, userId, new Date(), new Date()])

    await cartModel.ordersSelectByName(ordersName)
        .then(result => {
            ordersId = result[0].orders_id;
        })

    await cartModel.orderItemInsertInto([orderItemName, 1, goodsPrice, goodsId, ordersId, new Date(), new Date()])
        .then(result => {
            ctx.body = {
                state: 200,
                msg: "支付成功",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })

}

module.exports = {
    cartSelect: cartSelect,
    cartInsertInto: cartInsertInto,
    cartUserGoodsSelect: cartUserGoodsSelect,
    cartToPay: cartToPay,
    cartSelectGroupByUserId: cartSelectGroupByUserId,
    cartDelectById: cartDelectById,
    cartDelectByIds: cartDelectByIds,
    cartInsertIntos: cartInsertIntos
}

function arrFn(data) {
    const newData = []
    data.forEach(item => {
        const indexFound = newData.findIndex(newItem => newItem.shop_id === item.shop_id)
        const currentGoods = {
            cart_goods_number: item.cart_goods_number,
            goods_name: item.goods_name,
            goods_img: item.goods_img,
            goods_price: item.goods_price,
            goods_id: item.goods_id,
            checked: false
        }
        if (indexFound > -1) {
            newData[indexFound].goodsList.push(currentGoods)
        } else {
            newData.push({
                shop_id: item.shop_id,
                shop_name: item.shop_name,
                checked: false,
                goodsList: [currentGoods]
            })
        }
    })
    return newData
}