const router = require("express").Router();
const {
  registerUser,
  loginUser,
  protectedResource,
} = require("../controllers/user");
const { validateBody, schemas } = require("../helpers/routeHelpers");

router.route("/register").post(validateBody(schemas.authSchema), registerUser);
router.route("/login").post(loginUser);

router.route("/secret").get(protectedResource);

module.exports = router;
