const db = require('../connection_db');

module.exports = function memberLogin(memberData) {
    let result = {}
    return new Promise((resolve, reject) => {
        // find 
        db.query('SELECT * FROM member WHERE email = ? AND password = ?', 
            [memberData.email, memberData.password], function (err, rows){
                if (err){
                    result.status = 'fail!!';
                    result.err = 'server error, try later';
                    reject(result);
                    return;
                }
                resolve(rows);
            }
        );
    });
}