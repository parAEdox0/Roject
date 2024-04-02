const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/databaseCCC");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    uniquie: true
  },
  username: {
    type: String,
    required: true,
    uniquie: true
  },
  password: {
    type: String
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model("users", userSchema);