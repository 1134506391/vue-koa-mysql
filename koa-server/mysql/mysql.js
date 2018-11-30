const mysql = require('mysql');
const config = require('../config/config')

// 连接数据库
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = (sql, values) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

//
// 用户
//


let userSelect = () => {
    let sql = `select * from user;`
    return query(sql)
}
// 月份注册用户统计
let userSelectCountByMonth = () => {
    let sql = `select DATE_FORMAT(create_time,'%Y-%m') months,count(user_id) count from user group by months;`
    return query(sql)
}

let userInsertInto = (values) => {
    let sql = `insert into user values (null,?,?,?,?,default,?,default,?,?);`
    return query(sql, values)
}

let userUpdate = (values) => {
    let sql = `update user set user_name=?,user_password=?,uesr_phone=?,user_avator=?,user_gender=?,user_status=?,user_type=? where user_id=?;`
    return query(sql, values)
}

let userDelete = (id) => {
    let sql = `delete from user where user_id=${id};`
    return query(sql)
}

let userByPage = (page) => {
    let sql = `select * from user limit ${(page-1)*10},10;`
    return query(sql)
}

let userSelectById = (id) => {
    let sql = `select * from user where id=${id};`
    return query(sql)
}

let userSelectByName = (name) => {
    let sql = `select * from user where user_name="${name}";`
    return query(sql)
}

let userSearchByName = (name) => {
    let sql = `select * from user where user_name like "%${name}%";`
    return query(sql)
}


//
//商品分类
//

let goodsCategorySelect = () => {
    let sql = `select * from goods_category;`
    return query(sql)
}

//
// 商品
//
// 默认权重排序
let goodsSelect = () => {
    let sql = `select * from goods order by goods_priority DESC;`
    return query(sql)
}
// 按价格排序
let goodsSelectByPrice = () => {
    let sql = `select * from goods order by goods_price DESC;`
    return query(sql)
}

let goodsSelectByShopId = (id) => {
    let sql = `select a.*,b.* from goods a,shop b where a.shop_id = b.shop_id and a.shop_id="${id}";`
    return query(sql)
}

let goodsSelectById = (id) => {
    let sql = `select * from goods where goods_id = "${id}";`
    return query(sql)
}

let goodsDeleteById = (id) => {
    let sql = `delete from goods where goods_id = "${id}";`
    return query(sql)
}

let goodsInsertInto = (values) => {
    let sql = `insert into goods values (null,?,?,?,?,?,default,default,?,?,?);`
    return query(sql, values)
}

let goodsUpdate = (values) => {
    let sql = `update goods set goods_name=?,goods_desc=?,goods_img=?goods_price=?,goods_number=?,last_edit_time=? where goods_id=?;`
    return query(sql, values)
}
// 商品模糊查询
let goodsSearchByIdOrName = (idName) => {
    // let sql = `select * from goods where goods_id like '${idName}' or goods_name like '${idName}'`;
    let sql = `select * from goods where goods_id like "%${idName}%" or goods_name like "%${idName}%";`
    return query(sql)
}

let shopGoods = () => {
    let sql = "select `a`.`shop_id` as `a.shop_id`,`a`.`shop_name` as `a.shop_name`,b.goods_name from shop a,goods b where a.shop_id = b.shop_id";
    return query(sql)
}

//
//商家分类
//
let shopCategorySelect = () => {
    let sql = `select * from shop_category;`
    return query(sql)
}

//
//商家
//
let shopSelect = () => {
    let sql = `select * from shop;`
    return query(sql)
}


let shopSelectPage = (page) => {
    let sql = `select * from shop limit ${(page - 1) * 2},2;`
    return query(sql)
}

let shopSelectNameById = (id) => {
    let sql = `select shop_name from shop where shop_id=${id};`
    return query(sql)
}

let shopSelectByAccount = (account) => {
    let sql = `select * from shop where shop_account=${account};`
    return query(sql)
}

let shopAdd = (values) => {
    let sql = `insert into shop values(null,?,?,?,?,?,?,?,?,default,default,?,?);`
    return query(sql, values)
}

// 商家商品总数排序
let shopGoodsCount = () => {
    let sql = `select SUM(a.goods_number) as value,b.shop_name as name from goods a ,shop b where a.shop_id=b.shop_id GROUP BY b.shop_id;`
    return query(sql)
}

//
// 订单
//
let ordersSelect = () => {
    let sql = `select * from orders;`
    return query(sql)
}
let ordersSelectByName = (name) => {
    let sql = `select * from orders where orders_name="${name}";`
    return query(sql)
}

let ordersSelectByUserId = (id) => {
    let sql = `select a.* from orders a,user b where a.user_id = b.user_id and a.user_id ="${id}";`
    return query(sql)
}
let ordersInsertInto = (values) => {
    let sql = `insert into orders values(default,?,default,?,?,?,?);`
    return query(sql, values)
}

let ordersInsertIntoByUserIdPrice = (values) => {
    let sql = `insert into orders values(default,?,default,?,?,?,?);`
    return query(sql, values)
}



//
//订单项
//
let orderItemSelect = () => {
    let sql = `select * from order_item;`
    return query(sql)
}
let orderItemSelectByOrderId = (id) => {
    let sql = `select a.* from order_item a,order b where a.order_id = b.order_id and order_id = "${id}";`
    return query(sql)
}
let orderItemInsertInto = (values) => {
    let sql = `insert into order_item values(default,?,?,?,?,?,?,?);`
    return query(sql, values)
}

// 未支付(购物车),orders_state=1
// 根据用户id查询出用户的所有订单和订单下面的订单项,
let ordersSelectOrderItemSelectByUserId = (id) => {
        // let sql = `select a.*,b.*,c.*,d.* from orders a,order_item b,user c,goods d where a.user_id = c.user_id and a.orders_id = b.orders_id and b.goods_id = d.goods_id and a.user_id="${id}";`
        let sql = `select a.orders_name,a.orders_price,a.create_time,b.order_item_number,b.order_item_price,d.goods_name,d.goods_img,d.shop_id from orders a,order_item b,user c,goods d,shop e where a.user_id = c.user_id and a.orders_id = b.orders_id and b.goods_id = d.goods_id and d.shop_id = e.shop_id and a.orders_state=1 and a.user_id="${id}";`

        return query(sql);
    }
    // 已支付(生成订单)orders_state=2


//购物车
let cartSelect = () => {
    let sql = `select * from cart;`
    return query(sql)
}
let cartSelectByUserId = (userId) => {
    let sql = `select * from cart where user_id=${userId};`
    return query(sql)
}

let cartSelectGroupByUserId = (userId) => {
    let sql = `select a.cart_goods_number,c.goods_id,c.goods_name,c.goods_img,c.goods_price,d.shop_id,d.shop_name from cart a,user b,goods c,shop d where a.user_id = b.user_id and a.goods_id = c.goods_id and c.shop_id = d.shop_id and a.user_id =${userId};`
    return query(sql)
}

// 根据id单个删除
let cartDelectById = (id) => {
        let sql = `delete from cart where cart_id = ${id};`
        return query(sql)
    }
    // 根据id多个删除
let cartDelectByIds = (ids) => {
    let sql = `delete from cart where cart_id in (${ids});`
    return query(sql)
}
let cartDelectByGoodsId = (id) => {
    let sql = `delete from cart where goods_id = ${id};`
    return query(sql)
}

// 插入
let cartInsertInto = (values) => {
    let sql = `insert into cart values(default,?,?,?,?,?);`
    return query(sql, values)
}
let cartInsertIntos = (list) => {
    let sql = 'insert into cart values ';
    const values = list.map(item => `(default, '${item.user_id}', '${item.goods_id}','${item.goods_goods_number}','${item.create_time}','${item.last_edit_time}')`);
    sql += values;
    return query(sql, values)
}


// 更新
let cartUpdate = (values) => {
    let sql = `update cart set user_id=?,goods_id=?,cart_goods_number=? where cart_id=?;`
    return query(sql)
}

let cartUserGoodsSelect = (id) => {
        let sql = `select a.cart_goods_number,a.create_time,c.* from cart a,user b,goods c where a.user_id = b.user_id and a.goods_id = c.goods_id and a.user_id =${id};`
        return query(sql)
    }
    // 支付，移除购物车中支付的商品
let cartUpdateById = (userId, goodId) => {
    let sql = `update cart set cart_state = 2 where goods_id =${goodId} and user_id =${userId};`
    return query(sql)
}

let cartDeleteById = (userId, goodId) => {
    let sql = `delete from cart where goods_id=${goodId} and user_id = ${userId};`
    return query(sql)
}


module.exports = {
    query,
    //用户
    userSelect,
    userSelectCountByMonth,
    userInsertInto,
    userUpdate,
    userDelete,
    userByPage,
    userSelectById,
    userSelectByName,
    userSearchByName,
    // 商品分类
    goodsCategorySelect,
    //商品
    goodsSelect,
    goodsSelectByPrice,
    goodsSelectByShopId,
    goodsSelectById,
    shopSelectNameById,
    goodsDeleteById,
    goodsInsertInto,
    goodsUpdate,
    goodsSearchByIdOrName,
    //商家分类
    shopCategorySelect,
    //商家
    shopSelect,
    shopSelectPage,
    shopAdd,
    shopSelectByAccount,
    shopGoodsCount,
    //订单项
    orderItemSelect,
    orderItemInsertInto,
    orderItemSelectByOrderId,
    //订单
    ordersSelect,
    ordersSelectByName,
    ordersInsertInto,
    ordersSelectByUserId,
    ordersSelectOrderItemSelectByUserId,
    ordersInsertIntoByUserIdPrice,
    //购物车
    cartSelect,
    cartInsertInto,
    cartUserGoodsSelect,
    cartUpdateById,
    cartDeleteById,
    cartSelectGroupByUserId,
    cartSelectByUserId,
    cartDelectById,
    cartDelectByIds,
    cartUpdate,
    cartInsertIntos,
    cartDelectByGoodsId,
    shopGoods
}