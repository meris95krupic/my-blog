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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var User = require("../models/User");
var Post = require("../models/Post");
var bcrypt_1 = __importDefault(require("bcrypt"));
var log4js_1 = __importDefault(require("log4js"));
// LOG-Config
log4js_1.default.configure({
    appenders: { file: { type: 'file', filename: 'logs.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } }
});
var logger = log4js_1.default.getLogger();
//UPDATE
router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, _a, updatedUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // Log
                logger.info('PUT /users/:id started.');
                if (!(req.body.userId === req.params.id)) return [3 /*break*/, 7];
                if (!req.body.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 1:
                salt = _b.sent();
                _a = req.body;
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
            case 2:
                _a.password = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, User.findByIdAndUpdate(req.params.id, {
                        $set: req.body,
                    }, { new: true })];
            case 4:
                updatedUser = _b.sent();
                res.status(200).json(updatedUser);
                // Log
                logger.info('PUT /users/:id finished successfully (updatedUser: ' + updatedUser + ')');
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                res.status(500).json(err_1);
                // Log
                logger.error('PUT /users/:id ERROR:', err_1);
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(401).json("You can update only your account!");
                // Log
                logger.error('PUT /users/:id ERROR: You can update only your account!');
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
//DELETE
router.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Log
                logger.info('DELETE /users/:id started.');
                if (!(req.body.userId === req.params.id)) return [3 /*break*/, 10];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, User.findById(req.params.id)];
            case 2:
                user = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, Post.deleteMany({ username: user.username })];
            case 4:
                _a.sent();
                return [4 /*yield*/, User.findByIdAndDelete(req.params.id)];
            case 5:
                _a.sent();
                res.status(200).json("User has been deleted...");
                // Log
                logger.info('DELETE /users/:id finished successfully (id: ' + req.params.id + '), Msg: User has been deleted...');
                return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                // Log
                logger.error('DELETE /users/:id ERROR:', err_2);
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_3 = _a.sent();
                res.status(404).json("User not found!");
                // Log
                logger.error('DELETE /users/:id ERROR: User not found!');
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(401).json("You can delete only your account!");
                // Log
                logger.error('DELETE /users/:id ERROR: You can delete only your account!');
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); });
//GET USER
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, password, others, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                // Log
                logger.info('GET /users/:id started.');
                return [4 /*yield*/, User.findById(req.params.id)];
            case 1:
                user = _b.sent();
                _a = user._doc, password = _a.password, others = __rest(_a, ["password"]);
                res.status(200).json(others);
                // Log
                logger.info('GET /users/:id finished successfully (id: ' + req.params.id + ')');
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.status(500).json(err_4);
                // Log
                logger.error('GET /users/:id ERROR:', err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
