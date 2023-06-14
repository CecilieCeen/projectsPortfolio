var express = require('express');
var router = express.Router({ mergeParams: true });
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieJwtAuth = require('../middleware/authMiddleware.js')
const checkUser = require('../middleware/authMiddleware.js')


con = require('../controllers/pageController');

router.post('/login', async function(req, res, next) {
  let findUser = {
    username: req.body.username,
    password: req.body.password
  }
  const compare = await User.findOne({username: findUser.username})
  if(compare !== null){
    const validate = await bcrypt.compare(findUser.password, compare.password)
    if (validate){
      const user = {
        username: compare.username
    }
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    res.cookie("token", token,)
      res.redirect('http://localhost:3000/authentication')
    } else {

      res.redirect('http://localhost:5500/game/login.html')
    }
  }
});

router.post('/register', function(req, res, next) {
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      userpic: req.body.userpic
    })
    User.create(user)
    res.redirect('http://localhost:5500/game/gameselcect.html')
  } catch (err){
    res.status(400).json(err.message)
  }
});
router.get('/authentication', cookieJwtAuth, async function(req, res, next) {
  const foundUser = await User.findOne({username: req.user.username})
  console.log(foundUser)
  if(!foundUser){
    res.sendStatus(403)
    res.redirect('http://localhost:5500/game/login.html')
    next()
} else {
  res.redirect('http://localhost:5500/game/gameselcect.html')
}
});

router.get('/logout', async function(req, res, next) {
  res.clearCookie("token");
  res.redirect("http://localhost:5500/game/index.html")
});

router.get('/profilePics', con.getpics, function(req,res, next){
    res.json({ pics: res.locals.profilepics})
})

router.get('/profilePics/:profilepics', con.getspesificPic, function(req,res, next){
  res.json({ imgurl: res.locals.profilepics})
})

router.get('/userinfo', checkUser, async function(req,res,next){
  const foundUser = await User.findOne({username: req.user.username})
  console.log(foundUser)
  if(!foundUser){
} else {
  res.json({ foundUser: res.locals.user})
}
})

module.exports = router;
