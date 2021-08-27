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

router.post("/", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('POST /categories started.');

    const resp = await axios.post(apiUrl + '/categories', req.body);
    res.status(200).json(resp.data);

    // Log
    logger.info('POST /categories finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error("POST /categories ERROR:", err);
  }
});

router.get("/", async (req:Request, res:Response) => {
    try {
      // Log
      logger.info('GET /categories started.');

      const resp = await axios.get(apiUrl + '/categories');
      res.status(200).json(resp.data);

      // Log
      logger.info('GET /categories finished successfully.');
    } catch (err) {
      res.status(500).json(err);
      // Log
      logger.error("GET /categories ERROR:", err);
    }
  });

module.exports = router;
