const mongoose = require("mongoose");

/**
 * User must have usename & password and optionaly can have name
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // important for uniqueness
  },
  name: {
    type: String, // is not required we just need user name and password
  },
  password: {
    type: String,
    required: true, // cannot be empty
  },
});

mongoose.model("User", userSchema); //compiling the model:- adds the schema to mongoose
