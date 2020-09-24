const ProductController = require('../controllers/product');
import upload from '../middleware/upload'
var router = global.router;


router.get("/get-products", ProductController.getProducts);

router.get("/product/:productId", ProductController.productDetail);

router.post("/create-product", upload.array('images', 10), ProductController.createProduct);

router.delete("/product/:productId", ProductController.product_delete);

module.exports = router;