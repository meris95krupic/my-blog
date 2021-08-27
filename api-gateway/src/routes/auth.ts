import express, {Request, Response} from "express";
let router = express.Router();
import axios from 'axios';
import log4js from "log4js";

const apiUrl = 'http://localhost:7000/api'

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger()

//REGISTER
router.post("/register", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('POST /register started (username: ' + req.body.username + ', email: ' + req.body.email + ')');

    const resp = await axios.post(apiUrl + '/auth/register', req.body);
    res.status(200).json(resp.data);
    
    // Log
    logger.info('POST /register finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('POST /register ERROR:', err);
  }
});

//LOGIN
router.post("/login", async (req:Request, res:Response) => {
  try {
    // Log
    logger.info('POST /login started (username: ' + req.body.username + ')');
    
    const resp = await axios.post(apiUrl + '/auth/login', req.body);
    res.status(200).json(resp.data);
    
    // Log
    logger.info('POST /login finished successfully.');
  } catch (err) {
    res.status(500).json(err);
    // Log
    logger.error('POST /login ERROR:', err);
  }
});

module.exports = router;
