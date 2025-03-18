const express = require("express");
const app = express();
const accountRouter = express.Router();
const midddleware = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

accountRouter.get("/balance", midddleware, async function (req, res) {
  const Id = req.userId;
  const account = await Account.findOne({ userId: Id });
  res.json({ balance: account.balance });
});

accountRouter.post("/transfer", midddleware, async function (req, res) {
  const { to, balance } = req.body;
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account || account.balance < balance) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({ userId: to });

    if (!toAccount) {
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    const status = await transferfund(req.userId, to, balance);

    if (status) {
      res.json({
        message: "Transfer successful",
      });
    } else {
      res.json({ message: "Transaction Failed" });
    }
  } catch (err) {
    res.json(err.message);
  }
});

async function transferfund(fromAccount, toAccount, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Account.findOneAndUpdate({ userId: fromAccount }, { $inc: { balance: -amount } }, { session });
    await Account.findOneAndUpdate({ userId: toAccount }, { $inc: { balance: amount } }, { session });
    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error; // Optionally, rethrow the error to handle it further
  } finally {
    session.endSession();
  }
}

module.exports = accountRouter;
