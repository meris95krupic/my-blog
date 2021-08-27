import express, {Request, Response} from "express";
let router = express.Router();
import axios from 'axios';
import log4js from"log4js";

const apiUrl = 'http://localhost:7000/api'

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger()

//UPDATE
router.put("/:id", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('PUT /users/:id started.');
    
    const resp = await axios.put(apiUrl + `/users/${req.params.id}`, req.body);
    res.status(200).json(resp.data);

    // Log
    logger.info('PUT /users/:id finished successfully (id: ' + req.params.id + ')');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('PUT /users/:id ERROR:', err);
  }
});

//DELETE
router.delete("/:id", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('DELETE /users/:id started.');

    const resp = await axios.delete(apiUrl + `/users/${req.params.id}`, {
      data: req.body
    });
    res.status(200).json(resp.data);

    // Log
    logger.info('DELETE /users/:id finished successfully (id: ' + req.params.id + '), Msg: User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('DELETE /users/:id ERROR:', err);
  }
});

//GET USER
router.get("/:id", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('GET /users/:id started.');

    const resp = await axios.get(apiUrl + `/users/${req.params.id}`);
    res.status(200).json(resp.data);

    // Log
    logger.info('GET /users/:id finished successfully (id: ' + req.params.id + ')');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('GET /users/:id ERROR:', err);
  }
});

module.exports = router;
