"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var mongoose = require("mongoose");
var dotenv_1 = __importDefault(require("dotenv"));
var authRoute = require("./routes/auth");
var userRoute = require("./routes/users");
var port = "7000";
dotenv_1.default.config();
app.use(express_1.default.json());
mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(console.log("Connected to MongoDB"))
    .catch(function (err) { return console.log(err); });
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.listen(port, function () {
    console.log("User-Management is running on port: " + port);
});
