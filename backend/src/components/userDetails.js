const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetails);
