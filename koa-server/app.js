const koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const static = require('koa-static');
const util = require('./util/util');
const app = new koa();


app.use(cors({
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'], //增加put接口
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyParser());
app.use(static(path.join(__dirname, './static')))
    // app.use(static(path.join(__dirname, './static/dist')))

app.use(require("./router/user.js").routes());

app.use(require("./router/shopCategory.js").routes());
app.use(require("./router/shop.js").routes());

app.use(require("./router/goodsCategory.js").routes());
app.use(require("./router/goods.js").routes());

app.use(require("./router/orderItem.js").routes());
app.use(require("./router/orders.js").routes());

app.use(require("./router/cart.js").routes());


app.use((ctx) => {
    ctx.body = "aa"
})

app.listen(3000, () => {
    console.log("koa is starting at localhost:3000")
});