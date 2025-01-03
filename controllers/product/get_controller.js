const productData = require('../../models/product/all_products');

module.exports = class GetProduct {
    getAllProduct(req, res, next){
        productData().then(result => {
            res.json({
                result: result
            })
        }, (err) => {
            res.json({
                result: err
            })
        })
    }
}
