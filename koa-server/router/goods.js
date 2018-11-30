const router = require('koa-router')();
const controller = require('../controller/goods');


router.get('/goodsSelect', controller.goodsSelect)
router.get('/goodsSelectByShopId/:id', controller.goodsSelectByShopId)
router.get('/goodsSelectById/:id', controller.goodsSelectById)
router.get('/goodsSearchByIdOrName', controller.goodsSearchByIdOrName)
router.delete('/goodsDeleteById/:id', controller.goodsDeleteById)
router.post('/goodsInsertInto', controller.goodsInsertInto)
router.put('/goodsUpdate', controller.goodsUpdate)




module.exports = router;