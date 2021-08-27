import express, {Request, Response} from "express";
const app = express();
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const port = "5000"

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images")));

const storage = multer.diskStorage({
  destination: (req:Request, file:any, cb:Function) => {
    cb(null, "images");
  },
  filename: (req:Request, file:any, cb:Function) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req:Request, res:Response) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log("API-Gateway is running on port: " + port);
});
