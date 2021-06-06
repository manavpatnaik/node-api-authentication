const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) => {
  const token = jwt.sign(
    {
      iss: "Manav",
      sub: user.id,
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET
  );
  return token;
};

exports.registerUser = async (req, res, next) => {
  console.log("Register user called");
  const { email, password } = req.value.body;

  const user = await User.findOne({ "local.email": email });
  if (user) return res.status(403).send({ Error: "User already exists" });

  const newUser = new User({
    method: "local",
    local: { email: email, password: password },
  });
  await newUser.save();

  const token = signToken(newUser);

  res.status(201).json({ token });
};

exports.loginUser = async (req, res, next) => {
  console.log(req.user);
  const token = signToken(req.user);
  console.log("Successful login");
  res.status(200).send({ token });
};

exports.googleSignIn = async (req, res, next) => {
  const token = signToken(req.user);
  res.status(200).send({ token });
};

exports.protectedResource = async (req, res, next) => {
  console.log("I managed to get here");
  res.send(req.user);
};
