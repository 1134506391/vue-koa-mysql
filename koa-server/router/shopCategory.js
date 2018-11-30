const router = require('koa-router')();
const controller = require('../controller/shopCategory');


router.get('/shopCategorySelect', controller.shopCategorySelect)


module.exports = router;