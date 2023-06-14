const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const token = req.cookies.token
  console.log(token)
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    console.log(user)
    console.log('succes')
    next();
  } catch (err) {
    console.log('fail')
  }
}

module.exports = checkUser