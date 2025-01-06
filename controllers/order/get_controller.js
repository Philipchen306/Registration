// begin here 1/2
const Check = require('../../services/member_check')

const verify = require('../../models/member/verification_model')
const orderData = require('../../models/order/all_order_model')

check = new Check ();

module.exports = class GetOrder {
    getAllOrder(req, res, next) {
        const token = req.headers['token'];
        if(check.checkNull(token) === true) {
            res.json({
                err: 'please input token!'
            })
        }
        else if (check.checkNull(token) === false){
            verify(token).then(tokenResult => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: 'token error',
                            err: 'please re-login'
                        }
                    })
                }
                else {
                    orderData().then(result => {
                        res.json({
                            result: result
                        })
                    }, (err) => {
                        res.json({
                            result: err
                        })
                    })
                }
            })
        }
    }
}