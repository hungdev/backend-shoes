const checkAuth = require('../middleware/checkAuth');
const CategoryController = require('../controllers/category');
var router = global.router;


/* GET users listing. */
router.get("/get-categories", CategoryController.getCategories);

router.post("/create-category", CategoryController.createCategory);

router.delete("/category/:categoryId", CategoryController.category_delete);


module.exports = router;