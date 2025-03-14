const express = require("express");
const mainRouter=require('./routes/index');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1",mainRouter)


app.listen(3000)