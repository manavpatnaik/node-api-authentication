exports.registerUser = async (req, res, next) => {
  console.log("Register user called");
};

exports.loginUser = async (req, res, next) => {
  console.log("Login user called");
};

exports.protectedResource = async (req, res, next) => {
  console.log("Protected route called");
};
