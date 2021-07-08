const mongoose = require('./db');

const UsersSchema = mongoose.Schema({
  name: String,
  age: {
    type: Number,
    default: 18
  }
});

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;