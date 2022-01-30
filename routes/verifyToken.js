const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const veryfied = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = veryfied;
  } catch (error) {
    console.log(error);
  }
  next();
};
