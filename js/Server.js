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
var mongoose_1 = __importDefault(require("mongoose"));
var User_1 = require("./persistance/User");
var path = require('path');
var http = require('http');
var server = express_1.default();
// Specify where the compiled React app lives (copied the files manually from the client build)
var clientAppDirectory = path.join(__dirname, '../public', 'build');
server.use(express_1.default.json());
// Middleware that allows users to get files from a directory on the server
server.use(express_1.default.static(clientAppDirectory));
// Any other GET request that doesn't match previous routes should return the website
server.get('/*', function (request, response) {
    var indexPath = path.join(clientAppDirectory, 'index.html');
    return response.sendFile(indexPath);
});
mongoose_1.default.connect('mongodb://localhost/portfolioV2', { useNewUrlParser: true });
mongoose_1.default.connection.once('open', function () { return console.log("Connected to database!"); });
// If User will contact me by name , email and message then will hit this route.
server.post('/contactMe', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, email, message, existingUser, user, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                name_1 = (_a = request.body) === null || _a === void 0 ? void 0 : _a.name;
                email = (_b = request.body) === null || _b === void 0 ? void 0 : _b.email;
                message = (_c = request.body) === null || _c === void 0 ? void 0 : _c.message;
                return [4 /*yield*/, User_1.User.findOne({ email: { $eq: email } })];
            case 1:
                existingUser = _d.sent();
                console.log("email is " + email);
                if (!!existingUser) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.User.create({ name: name_1, email: email, message: message })];
            case 2:
                user = _d.sent();
                response.send(user);
                return [3 /*break*/, 4];
            case 3:
                response.sendStatus(400);
                _d.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _d.sent();
                console.log('error creating new user', error_1.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || '4000';
server.set('port', port);
server.listen(port, function () { return console.log("React  Running on localhost:" + port); });
