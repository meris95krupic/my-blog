import express, {Request, Response} from "express";
let router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
import log4js from "log4js";

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger() 

//CREATE POST
router.post("/", async (req:Request, res:Response) => {
  const newPost = new Post(req.body);
  try {
    // Log
    logger.info('POST /posts started.');

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);

    // Log
    logger.info('POST /posts finished successfully (savedPost.title: ' + savedPost.title + ')');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('POST /posts ERROR:', err);
  }
});

//UPDATE POST
router.put("/:id", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('PUT /posts/:id started.');

    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
        // Log
        logger.info('PUT /posts/:id finished successfully (updatedPost.title: ' + updatedPost.title + ')');    
      } catch (err) {
        res.status(500).json(err);
        // Log
        logger.error('PUT /posts/:id ERROR:', err);
      }
    } else {
      res.status(401).json("You can update only your post!");
      // Log
      logger.error('PUT /posts/:id ERROR: You can update only your post!');
    }
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('PUT /posts/:id ERROR:', err);
  }
});

//DELETE POST
router.delete("/:id", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('DELETE /posts/:id started.');
    
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
        // Log
        logger.info('DELETE /posts/:id finished successfully (id: ' + req.params.id + ')');
      } catch (err) {
        res.status(500).json(err);
        // Log
        logger.error('DELETE /posts/:id ERROR:', err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
      // Log
      logger.error('DELETE /posts/:id ERROR: You can delete only your post!');
    }
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('DELETE /posts/:id ERROR:', err);
  }
});

//GET POST
router.get("/:id", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('GET /posts/:id started.');

    const post = await Post.findById(req.params.id);
    res.status(200).json(post);

    // Log
    logger.info('GET /posts/:id finished successfully (id: ' + req.params.id + ')');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('GET /posts/:id ERROR:', err);
  }
});

//GET ALL POSTS
router.get("/", async (req:Request, res:Response) => {
  // Log
  logger.info('GET /posts started.');

  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);

    // Log
    logger.info('GET /posts finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('GET /posts ERROR:', err);
  }
});

module.exports = router;
