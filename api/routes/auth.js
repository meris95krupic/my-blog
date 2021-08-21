const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const log4js = require("log4js");

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger()

//REGISTER
router.post("/register", async (req, res) => {
  try {
    // Log
    logger.info('POST /register started (username: ' + req.body.username + ', email: ' + req.body.email + ')');

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
    // Log
    logger.info('POST /register finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('POST /register ERROR:', err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // Log
    logger.info('POST /login started (username: ' + req.body.username + ')');
    
    const user = await User.findOne({ username: req.body.username });
    if(!user){
      // Log
      logger.error('POST /login ERROR: Wrong credentials!');
      res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated){
      // Log
      logger.error('POST /login ERROR: Wrong credentials!');
      res.status(400).json("Wrong credentials!");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
    
    // Log
    logger.info('POST /login finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('POST /login ERROR:', err);
  }
});

module.exports = router;
