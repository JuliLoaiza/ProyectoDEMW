const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
  {
    fname:String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },

  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetails);
