const ProductRouting = require('./handle/productRouter');
const handle = {
    "home":ProductRouting.showHome,
    "product/create":ProductRouting.showFormCreate
};

module.exports = handle;