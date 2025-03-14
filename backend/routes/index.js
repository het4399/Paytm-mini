const user = require("./user");
const express = require("express");
const app = express();

const router = express.Router();
app.use("/user", user);

module.exports = router;
