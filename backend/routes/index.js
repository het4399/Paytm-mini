const user = require("./user");
const express = require("express");
const app = express();

const router = express.Router();
router.use("/user", user);

module.exports = router;
