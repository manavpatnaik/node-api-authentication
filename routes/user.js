const router = require("express").Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  protectedResource,
} = require("../controllers/user");
const { validateBody, schemas } = require("../helpers/routeHelpers");

router.route("/register").post(validateBody(schemas.authSchema), registerUser);
router.route("/login").post(loginUser);

router
  .route("/secret") 
  .get(passport.authenticate("jwt", { session: false }), protectedResource);

module.exports = router;
