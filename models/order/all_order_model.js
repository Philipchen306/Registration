const db = require('../connection_db');

module.exports = function getAllOrder() {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM order_list', function (err, rows) {
            if (err) {
                console.log(err);
                result.status = 'fail to get all order data';
                result.err = 'server error, try again later';
                reject(result);
                return;
            }
            resolve(rows)
        })
    })
}