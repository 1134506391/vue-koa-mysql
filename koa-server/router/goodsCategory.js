const router = require('koa-router')();
const controller = require('../controller/goodsCategory');


router.get('/goodsCategorySelect', controller.goodsCategorySelect)


module.exports = router;