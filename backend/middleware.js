const jwt_secret = require("./config");

const jwt = require("jsonwebtoken");
function autmiddlware(req, res, next) {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];
  const a = jwt.verify(token, jwt_secret);
  if (a.userId) {
    req.userId = a.userId; 
    next();
  }
  else{
    res.status(403).json({
        message:"Invalid token"
    })
  }
}
module.exports = autmiddlware;
