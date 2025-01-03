const jwt = require('jsonwebtoken');
const config = require('../../config/development_config')

// token verification
module.exports = function verifyToken(token) {
    let tokenResult = '';
    const time = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        // whether token is correct
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded){
                if (err){
                    tokenResult = false;
                    resolve(tokenResult);
                   
                }
                else if(decoded.exp <= time){  // token expiration
                    tokenResult = false;
                    resolve(tokenResult);
                }
                else {
                    tokenResult = decoded.data
                    resolve(tokenResult);
                }
            })
        }
    })
}