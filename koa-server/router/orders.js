const router = require('koa-router')();
const controller = require('../controller/orders');


// router.get('/ordersSelectByUserId/:id', controller.ordersSelectByUserId)
// router.get('/goodsSelectByShopId/:id', controller.goodsSelectByShopId)
router.post('/ordersInsertIntoByUserIdPrice', controller.ordersInsertIntoByUserIdPrice)
router.post('/cartToOrder',controller.cartToOrder)



module.exports = router;