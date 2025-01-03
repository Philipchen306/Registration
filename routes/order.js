var express = require('express');
var router = express.Router();

const OrderModifyMethod = require('../controllers/order/modify_controller');
const OrderGetMethod = require('../controllers/order/get_controller')

orderModifyMethod = new OrderModifyMethod;
orderGetMethod = new OrderGetMethod;

router.post('/order', orderModifyMethod.postOrderAllProduct);
router.get('/order', orderGetMethod.getAllOrder)

module.exports = router;

