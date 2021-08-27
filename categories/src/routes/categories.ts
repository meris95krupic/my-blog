import express, {Request, Response} from "express";
let router = express.Router();
const Category = require("../models/Category");
import log4js from"log4js";

// LOG-Config
log4js.configure({
  appenders: { file: { type: 'file', filename: 'logs.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger()

router.post("/", async (req:Request, res:Response) => {
  const newCat = new Category(req.body);
  try {
    // Log
    logger.info('POST /categories started.');

    const savedCat = await newCat.save();
    res.status(200).json(savedCat);

    // Log
    logger.info('POST /categories finished successfully (savedCat: ' + savedCat + ')');
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

      const cats = await Category.find();
      res.status(200).json(cats);

      // Log
      logger.info('GET /categories finished successfully.');
    } catch (err) {
      res.status(500).json(err);
      // Log
      logger.error("GET /categories ERROR:", err);
    }
  });

module.exports = router;
