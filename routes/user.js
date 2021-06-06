const router = require("express").Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  protectedResource,
} = require("../controllers/user");
const { validateBody, schemas } = require("../helpers/routeHelpers");
const passportJwt = passport.authenticate("jwt", { session: false });

router.route("/register").post(validateBody(schemas.authSchema), registerUser);
router
  .route("/login")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    loginUser
  );

router.route("/secret").get(passportJwt, protectedResource);

module.exports = router;
