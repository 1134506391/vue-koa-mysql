const router = require('koa-router')();
const controller = require('../controller/shop');


router.get('/shopSelect', controller.shopSelect)
router.get('/shopSelectPage/:page', controller.shopSelectPage)
router.get('/shopGoodsCount', controller.shopGoodsCount)
router.post('/shopAdd', controller.shopAdd)
router.post('/shopLogin', controller.shopLogin)
router.get('/shopGoods', controller.shopGoods)




module.exports = router;