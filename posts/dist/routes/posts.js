"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var User = require("../models/User");
var Post = require("../models/Post");
var log4js_1 = __importDefault(require("log4js"));
// LOG-Config
log4js_1.default.configure({
    appenders: { file: { type: 'file', filename: 'logs.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } }
});
var logger = log4js_1.default.getLogger();
//CREATE POST
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPost, savedPost, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPost = new Post(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                // Log
                logger.info('POST /posts started.');
                return [4 /*yield*/, newPost.save()];
            case 2:
                savedPost = _a.sent();
                res.status(200).json(savedPost);
                // Log
                logger.info('POST /posts finished successfully (savedPost.title: ' + savedPost.title + ')');
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                // Log
                logger.error('POST /posts ERROR:', err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//UPDATE POST
router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, updatedPost, err_2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                // Log
                logger.info('PUT /posts/:id started.');
                return [4 /*yield*/, Post.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!(post.username === req.body.username)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body,
                    }, { new: true })];
            case 3:
                updatedPost = _a.sent();
                res.status(200).json(updatedPost);
                // Log
                logger.info('PUT /posts/:id finished successfully (updatedPost.title: ' + updatedPost.title + ')');
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                // Log
                logger.error('PUT /posts/:id ERROR:', err_2);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(401).json("You can update only your post!");
                // Log
                logger.error('PUT /posts/:id ERROR: You can update only your post!');
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                // Log
                logger.error('PUT /posts/:id ERROR:', err_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
//DELETE POST
router.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_4, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                // Log
                logger.info('DELETE /posts/:id started.');
                return [4 /*yield*/, Post.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!(post.username === req.body.username)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, post.delete()];
            case 3:
                _a.sent();
                res.status(200).json("Post has been deleted...");
                // Log
                logger.info('DELETE /posts/:id finished successfully (id: ' + req.params.id + ')');
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                res.status(500).json(err_4);
                // Log
                logger.error('DELETE /posts/:id ERROR:', err_4);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(401).json("You can delete only your post!");
                // Log
                logger.error('DELETE /posts/:id ERROR: You can delete only your post!');
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                // Log
                logger.error('DELETE /posts/:id ERROR:', err_5);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
//GET POST
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Log
                logger.info('GET /posts/:id started.');
                return [4 /*yield*/, Post.findById(req.params.id)];
            case 1:
                post = _a.sent();
                res.status(200).json(post);
                // Log
                logger.info('GET /posts/:id finished successfully (id: ' + req.params.id + ')');
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(500).json(err_6);
                // Log
                logger.error('GET /posts/:id ERROR:', err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET ALL POSTS
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, catName, posts, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Log
                logger.info('GET /posts started.');
                username = req.query.user;
                catName = req.query.cat;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                posts = void 0;
                if (!username) return [3 /*break*/, 3];
                return [4 /*yield*/, Post.find({ username: username })];
            case 2:
                posts = _a.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!catName) return [3 /*break*/, 5];
                return [4 /*yield*/, Post.find({
                        categories: {
                            $in: [catName],
                        },
                    })];
            case 4:
                posts = _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Post.find()];
            case 6:
                posts = _a.sent();
                _a.label = 7;
            case 7:
                res.status(200).json(posts);
                // Log
                logger.info('GET /posts finished successfully.');
                return [3 /*break*/, 9];
            case 8:
                err_7 = _a.sent();
                res.status(500).json(err_7);
                // Log
                logger.error('GET /posts ERROR:', err_7);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
