const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Het:Qxbu9SYJocBPqr3l@cluster0.ivlpmjg.mongodb.net/paytm_backend");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const BankScehma = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
  balance: Number,
});
const User = new mongoose.model("UserSchema", UserSchema);
const Account = new mongoose.model("BankScehma", BankScehma);
module.exports = { User, Account };
