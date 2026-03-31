const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vishalssb858_db_user:BxNkBcYkcHUA82aK@clusterpaytm1.up0tuda.mongodb.net/",
);

const userSchema = mongoose.String({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
