import express from "express";
const app = express();
const mongoose = require("mongoose");
import dotenv from "dotenv";
const categoryRoute = require("./routes/categories");

const port = "6000"

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err:string) => console.log(err));

app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log("Categories-Service is running on port: " + port);
});
