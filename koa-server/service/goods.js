const goodsModel = require('../mysql/mysql');

const goodsSelect = async(ctx) => {
    let data = await goodsModel.goodsSelect();
    return data;
}

module.exports = {
    goodsSelect: goodsSelect
}