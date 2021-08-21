const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

const log4js = require("log4js");

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger()

//UPDATE
router.put("/:id", async (req, res) => {
  // Log
  logger.info('PUT /users/:id started.');

  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
      // Log
      logger.info('PUT /users/:id finished successfully (updatedUser: ' + updatedUser + ')');
    } catch (err) {
      res.status(500).json(err);
      // Log
      logger.error('PUT /users/:id ERROR:', err);
    }
  } else {
    res.status(401).json("You can update only your account!");
    // Log
    logger.error('PUT /users/:id ERROR: You can update only your account!');
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  // Log
  logger.info('DELETE /users/:id started.');

  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");

        // Log
        logger.info('DELETE /users/:id finished successfully (id: ' + req.params.id + '), Msg: User has been deleted...');
      } catch (err) {
        res.status(500).json(err);
        // Log
        logger.error('DELETE /users/:id ERROR:', err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
      // Log
      logger.error('DELETE /users/:id ERROR: User not found!');
    }
  } else {
    res.status(401).json("You can delete only your account!");
    // Log
    logger.error('DELETE /users/:id ERROR: You can delete only your account!');
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    // Log
    logger.info('GET /users/:id started.');

    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);

    // Log
    logger.info('GET /users/:id finished successfully (id: ' + req.params.id + ')');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('GET /users/:id ERROR:', err);
  }
});

module.exports = router;
