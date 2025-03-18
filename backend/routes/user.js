const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = express.Router();
const { User, Account } = require("../db");
const z = require("zod");
const jwt = require("jsonwebtoken");
const jwt_secret = require("../config");
const midddleware = require("../middleware");
const user = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
userRouter.post("/signup", async function (req, res) {
  try {
    const data = req.body;
    const success = user.safeParse(data);
    if (!success.success) {
      return res.status(404).json({ message: success.error });
    }
    const iser = await User.findOne({ email: data.email });
    if (iser) {
      return res.status(401).json({ message: "Email taken" });
    }

    const NewEntty = new User(data);
    await NewEntty.save();
    const newAccount = new Account({ userId: NewEntty._id, balance: 1 + Math.random() * 1000 });
    await newAccount.save();
    const token = jwt.sign({ userId: NewEntty._id }, jwt_secret);
    res.json({ message: "User created", token });
  } catch (err) {
    console.log(err);
  }
});
userRouter.put("/", midddleware, async function (req, res) {
  try {
    const data = req.body;
    const { success } = user.safeParse(data);
    if (!success) {
      res.status(404).send("Invalid User Credentials");
    }
    await User.updateOne({ _id: req.userId }, data);
    res.status(200).send("Data Updated successfully");
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";
  const userData = await User.find({ $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }] }).select("-password -__v");
  if (userData.length) {
    res.status(200).json(userData);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});
module.exports = userRouter;
