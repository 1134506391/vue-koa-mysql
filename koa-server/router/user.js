const router = require('koa-router')();
const controller = require('../controller/user');


router.get('/userSelect', controller.userSelect)
router.get('/userSelectCountByMonth', controller.userSelectCountByMonth)
router.post('/userInsertInto', controller.userInsertInto)
router.post('/userLogin', controller.userLogin)

module.exports = router;