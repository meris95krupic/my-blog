"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var mongoose = require("mongoose");
var dotenv_1 = __importDefault(require("dotenv"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var authRoute = require("./routes/auth");
var userRoute = require("./routes/users");
var postRoute = require("./routes/posts");
var categoryRoute = require("./routes/categories");
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../images")));
mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(console.log("Connected to MongoDB"))
    .catch(function (err) { return console.log(err); });
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    },
});
var upload = multer_1.default({ storage: storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
    res.status(200).json("File has been uploaded");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.listen("5000", function () {
    console.log("Backend is running...");
});
