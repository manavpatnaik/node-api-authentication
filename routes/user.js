const router = require("express").Router();
const {
  registerUser,
  loginUser,
  protectedResource,
} = require("../controllers/user");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/protectedResource").get(protectedResource);

module.exports = router;
