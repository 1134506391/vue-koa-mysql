const router = require('koa-router')();
const shopModel = require('../mysql/mysql');
const multer = require('koa-multer');

// router.get('/categoryAll/:page', async (ctx, next) => {
//     let pages,
//         count;
//     let page = ctx.params.page; //传过来的第几页
//     // 查所有数据
//     await userModel.findAllCategory()
//         .then(result => {
//             count = result.length;
//             pages = Math.ceil(count / 5)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     // 查分页数据
//     await userModel.findCategoryByPage(page)
//         .then(result => {
//             ctx.body = {
//                 code: 200,
//                 msg: '查询所有分类数据成功',
//                 count: count,
//                 pages: pages,
//                 data: result,
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             ctx.body = false;
//         })
// })


const shopSelectPage = async(ctx) => {
    let pages, count;
    let page = ctx.params.page;
    await shopModel.shopSelect()
        .then(result => {
            count = result.length;
            pages = Math.ceil(count / 2)
        })
        .catch(error => {
            console.log(error);
        })
    await shopModel.shopSelectPage(page)
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "所有商品分类",
                data: result,
                count: count,
                pages: pages
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const shopGoodsCount = async(ctx) => {
    await shopModel.shopGoodsCount()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "所有商家商品总数排序",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const shopSelect = async(ctx) => {
    await shopModel.shopSelect()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "所有商品分类",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}

const shopGoods = async(ctx) => {
    await shopModel.shopGoods()
        .then(result => {
            ctx.body = {
                status: 200,
                msg: "店铺商品包裹",
                data: result
            }
        })
        .catch(error => {
            console.log(error);
            ctx.body = false;
        })
}



const shopAdd = async(ctx) => {
    var data;
    var shopImg;
    var storage = multer.diskStorage({
            //文件保存路径  
            destination: function(req, file, cb) {
                cb(null, 'static/images/shop')
            },
            //修改文件名称  
            filename: function(req, file, cb) {
                var fileFormat = (file.originalname).split(".");
                cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        })
        //加载配置  
    var upload = multer({ storage: storage }).single('file');
    await upload(ctx)
        .then(result => {
            data = JSON.parse(ctx.req.body.data);
            shopImg = ctx.req.file.filename;
        })
        .catch(error => {
            console.log(error)
        })
    await shopModel.shopAdd([data.shopAccount, data.shopPassword, data.shopName, data.shopDesc, data.shopPhone, shopImg, data.shopAddress, data.shopCategoryId, new Date(), new Date()])
        .then(result => {
            ctx.body = {
                code: 200,
                msg: '插入成功',
                data: result,
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })

}

const shopLogin = async(ctx) => {
    // console.log(ctx.request.body)
    let account = ctx.request.body.shopAccount;
    let password = ctx.request.body.shopPassword;

    await shopModel.shopSelectByAccount(account)
        .then(result => {
            // console.log(result)
            if (account == result[0].shop_account && password == result[0].shop_password) {
                ctx.body = {
                    state: 200,
                    msg: '账号密码正确，登录成功',
                    // data: result,
                    // data: [result[0].shop_id, result[0].shop_account, result[0].shop_name],
                    data: {
                        shop_id: result[0].shop_id,
                        shop_account: result[0].shop_account,
                        shop_name: result[0].shop_name,
                        shop_img: result[0].shop_img
                    }
                }
            } else {
                ctx.body = {
                    state: 201,
                    msg: '账号密码错误，登录失败',
                    data: result
                }
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = false;
        })
}



module.exports = {
    shopSelect: shopSelect,
    shopAdd: shopAdd,
    shopLogin: shopLogin,
    shopSelectPage: shopSelectPage,
    shopGoodsCount:shopGoodsCount,
    shopGoods:shopGoods
}