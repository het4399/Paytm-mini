const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = express.Router();
const User = require("../db");
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
    console.log(data);
    const success = user.safeParse(data);
    if (!success.success) {
      return res.json({ message: "Email taken/ Invalid" });
    }
    const iser = await User.findOne({ email: data.email });
    if (iser) {
      return res.status(401).json({ message: "Email taken" });
    }

    const NewEntty = new User(data);
    NewEntty.save();
    const token = jwt.sign({ userId: NewEntty._id }, jwt_secret);
    res.json({ message: "User created", token });
  } catch (err) {
    console.log(err);
  }
});
userRouter.put("/", midddleware,async function (req, res) {
  try{
    const data=req.body;
    const {success} = user.safeParse(data);
    if(!success){
      res.status(404).send('Invalid User Credentials')
    }
    await User.updateOne({_id:req.userId,},data)
    res.status(200).send('Data Updated successfully')
  }catch (err){
    console.log(err)
  }
});
module.exports = userRouter;
