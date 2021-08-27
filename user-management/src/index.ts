import express from "express";
const app = express();
const mongoose = require("mongoose");
import dotenv from "dotenv";
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

const port = "7000"

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

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log("User-Management is running on port: " + port);
});
