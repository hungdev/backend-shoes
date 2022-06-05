const GenderController = require('../controllers/brand');
var router = global.router;


/* GET users listing. */
router.get("/get-brands", GenderController.getBrands);

router.post("/create-brand", GenderController.createBrand);

router.delete("/brand/:brandId", GenderController.deleteBrand);


module.exports = router;