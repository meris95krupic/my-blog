import express, {Request, Response} from "express";
let router = express.Router();
import axios from 'axios';
import log4js from"log4js";

const apiUrl = 'http://localhost:8000/api'

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger()

//CREATE POST
router.post("/", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('POST /posts started.');

    const resp = await axios.post(apiUrl + '/posts', req.body);
    res.status(200).json(resp.data);

    // Log
    logger.info('POST /posts finished successfully (savedPost.title: ' + resp.data.title + ')');
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

    const resp = await axios.put(apiUrl + `/posts/${req.params.id}`, req.body);
    res.status(200).json(resp.data);

    // Log
    logger.info('PUT /posts/:id finished successfully.');    
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

    const resp = await axios.delete(apiUrl + `/posts/${req.params.id}`, {
      data: req.body
    });
    res.status(200).json(resp.data);

    // Log
    logger.info('DELETE /posts/:id finished successfully (id: ' + req.params.id + ')'); 
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

    const resp = await axios.get(apiUrl + `/posts/${req.params.id}`);
    res.status(200).json(resp.data);

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
  try {
    // Log
    logger.info('GET /posts started.');

    const resp = await axios.get(apiUrl + '/posts/');
    res.status(200).json(resp.data);

    // Log
    logger.info('GET /posts finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('GET /posts ERROR:', err);
  }
});

module.exports = router;
