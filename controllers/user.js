const User = require("../models/User");

exports.registerUser = async (req, res, next) => {
  console.log("Register user called");
  const { email, password } = req.value.body;

  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ Error: "User already exists" });

  const newUser = new User({ email, password });
  await newUser.save();

  res.status(201).json(newUser);
};

exports.loginUser = async (req, res, next) => {
  console.log("Login user called");
};

exports.protectedResource = async (req, res, next) => {
  console.log("Protected route called");
};
