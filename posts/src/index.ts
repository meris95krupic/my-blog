import express from "express";
const app = express();
const mongoose = require("mongoose");
import dotenv from "dotenv";
const postRoute = require("./routes/posts");

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

app.listen(port, () => {
  console.log("Posts-Services is running on port: " + port);
});
