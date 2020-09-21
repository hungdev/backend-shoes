const checkAuth = require('../middleware/checkAuth');
const UserController = require('../controllers/user');
import upload from '../middleware/upload'
var router = global.router;

/* GET users listing. */
// router.get("/get-users", UserController.getUsers);

router.get("/get-me", checkAuth, UserController.getMe);

router.post("/signup", UserController.userSignup);

router.post("/login", UserController.userLogin);

// router.put("/update-user", checkAuth, upload.single('avatarUrl'), UserController.update_user);

// router.delete("/user/:userId", checkAuth, UserController.user_delete);

module.exports = router;