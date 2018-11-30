const router = require('koa-router')();
const controller = require('../controller/cart');


router.get('/cartSelect', controller.cartSelect)
router.get('/cartUserGoodsSelect/:id', controller.cartUserGoodsSelect)
router.post('/cartInsertInto', controller.cartInsertInto)
router.post('/cartToPay', controller.cartToPay)
router.get('/cartSelectGroupByUserId/:id', controller.cartSelectGroupByUserId)
router.get('/cartDelectById', controller.cartDelectById)
router.get('/cartInsertIntos', controller.cartInsertIntos)








module.exports = router;