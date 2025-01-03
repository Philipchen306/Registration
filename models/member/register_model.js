// import { query } from './connection_db';
const db = require('../connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // find duplicate email
        db.query('SELECT email from member_info WHERE email = ?',memberData.email, function (err,rows){
            if (err) {
                console.log(err);
                result.status = "註冊失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
        // if duplicate
            if (rows.length >= 1){
                result.status = 'fail!!';
                result.err = 'duplicate!!';
                reject(result);
            }
            else{
                // 將資料寫入資料庫
                db.query('INSERT INTO member_info SET ?', memberData, function (err, rows) {
                    // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                    result.registerMember = memberData;
                    resolve(result);
                })
            }
        })
    })
}