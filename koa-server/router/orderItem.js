const router = require('koa-router')();
const controller = require('../controller/orderItem');


router.post('/orderItemInsertInto', controller.orderItemInsertInto)
    // router.get('/goodsSelectByShopId/:id', controller.goodsSelectByShopId)
    // router.get('/goodsSelectById/:id', controller.goodsSelectById)


module.exports = router;