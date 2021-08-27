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
var axios_1 = __importDefault(require("axios"));
var log4js_1 = __importDefault(require("log4js"));
var apiUrl = 'http://localhost:8000/api';
// LOG-Config
log4js_1.default.configure({
    appenders: { file: { type: 'file', filename: 'logs.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } }
});
var logger = log4js_1.default.getLogger();
//CREATE POST
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Log
                logger.info('POST /posts started.');
                return [4 /*yield*/, axios_1.default.post(apiUrl + '/posts', req.body)];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp.data);
                // Log
                logger.info('POST /posts finished successfully (savedPost.title: ' + resp.data.title + ')');
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                // Log
                logger.error('POST /posts ERROR:', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//UPDATE POST
router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Log
                logger.info('PUT /posts/:id started.');
                return [4 /*yield*/, axios_1.default.put(apiUrl + ("/posts/" + req.params.id), req.body)];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp.data);
                // Log
                logger.info('PUT /posts/:id finished successfully.');
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                // Log
                logger.error('PUT /posts/:id ERROR:', err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//DELETE POST
router.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Log
                logger.info('DELETE /posts/:id started.');
                return [4 /*yield*/, axios_1.default.delete(apiUrl + ("/posts/" + req.params.id), {
                        data: req.body
                    })];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp.data);
                // Log
                logger.info('DELETE /posts/:id finished successfully (id: ' + req.params.id + ')');
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                // Log
                logger.error('DELETE /posts/:id ERROR:', err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET POST
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Log
                logger.info('GET /posts/:id started.');
                return [4 /*yield*/, axios_1.default.get(apiUrl + ("/posts/" + req.params.id))];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp.data);
                // Log
                logger.info('GET /posts/:id finished successfully (id: ' + req.params.id + ')');
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json(err_4);
                // Log
                logger.error('GET /posts/:id ERROR:', err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET ALL POSTS
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Log
                logger.info('GET /posts started.');
                return [4 /*yield*/, axios_1.default.get(apiUrl + '/posts/')];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp.data);
                // Log
                logger.info('GET /posts finished successfully.');
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                // Log
                logger.error('GET /posts ERROR:', err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;