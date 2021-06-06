const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (this.method !== "local") next();
  const salt = await bcrypt.genSalt(10);
  this.local.password = await bcrypt.hash(this.local.password, salt);
  next();
});

UserSchema.methods.isPasswordValid = async function (password) {
  try {
    return await bcrypt.compare(password, this.local.password);
  } catch (error) {
    console.log("Bcrypt compare error");
    throw new Error(error);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
