const db = require('../connection_db')

module.exports = function getProductData(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM product', function (err, rows){
            if(err){
                console.log(err);
                result.status = 'get all products fail';
                result.err = 'server error. Plesase try again later';
                reject(result);
                return;
            }
            resolve(rows);
        })
    })
       
}