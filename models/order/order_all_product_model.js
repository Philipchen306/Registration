const db = require('../connection_db');

module.exports = function orderProductListData(orderList) {
    let result = {};
    return new Promise (async (resolve, reject) => {
        let orderID = await getOrderId() + 1;

        const products = orderList.productID;
        const productArray = products.split(',');

        const quantities = orderList.quantity;
        const quantityArray = quantities.split(',');

        let productQuantity = {};
        for (let i in productArray) {
            let index = productArray.indexOf(productArray[i]);
            for (let j in quantityArray){
                productQuantity[productArray[i]] = productArray[index];
            }
        }
        let orderAllData = [];
        for (let key in productQuantity) {
            const price = await (getProductPrice(key));
            const orderData = {
                order_id: orderID,
                member_id: orderList.member_id,
                product_id: key,
                order_quantity: parseInt(productQuantity[key]),
                order_price: parseInt(price) * parseInt(productQuantity[key]),
                order_date: orderList.orderDate,
                is_complete: 0
            };
            // insert order data
            db.query('INSERT INTO order_list SET ?', orderData, function (err,rows) {
                if (err) {
                    console.log(err);
                    result.err = 'server error';
                    reject(result);
                    return;
                }
            })
            orderAllData.push(orderData);
        }
        result.state = 'order successfully!!!';
        result.orderData = orderAllData;
        resolve(result);
    })
}
const getOrderId = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT MAX(order_id) AS id FROM order_list', function (err, rows, fields) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows[0].id);
        })
    })
}

const getProductPrice = (productId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT price FROM product where id = ?', productId, function(err, rows){
            if(err){
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows[0].price);
        })
    })
}