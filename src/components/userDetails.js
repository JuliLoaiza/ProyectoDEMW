const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
  {
    uname: String,
    email: String,
    number: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetails);
