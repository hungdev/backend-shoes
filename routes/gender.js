const checkAuth = require('../middleware/checkAuth');
const GenderController = require('../controllers/gender');
var router = global.router;


/* GET users listing. */
router.get("/get-genders", GenderController.getGenders);

router.post("/create-gender", GenderController.createGender);

router.delete("/category/:categoryId", GenderController.deleteGender);


module.exports = router;