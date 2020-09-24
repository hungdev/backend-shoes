const checkAuth = require('../middleware/checkAuth');
const OrderController = require('../controllers/order');
var router = global.router;


/* GET users listing. */
router.get("/get-orders", checkAuth, OrderController.getOrders);

router.get("/get-order/:orderId", checkAuth, OrderController.getOrderDetail);

router.post("/create-order", checkAuth, OrderController.createOrder);

// router.delete("/category/:categoryId", OrderController.category_delete);


module.exports = router;