const db = require('../connection_db');

module.exports = function customerEdit(id, memberUpdateData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('UPDATE member_info SET ? WHERE id = ?', [memberUpdateData, id], function (err, rows){
            if (err) {
                console.log(err);
                result.status = 'update fail!!'
                result.err = 'server fail, please try later'
                reject(result);
                return;
            }
            result.status = 'update successfully!!'
            result.memberUpdateData = memberUpdateData
            resolve(result)
        })
    })
}