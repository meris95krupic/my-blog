import express from "express";
const app = express();
const mongoose = require("mongoose");
import dotenv from "dotenv";
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const port = "8000"

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

app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log("Posts-Management is running on port: " + port);
});
