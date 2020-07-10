"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var http_1 = __importDefault(require("http"));
var app = express_1.default();
var bodyParser = require('body-parser');
// Set region for AWS SDKs
aws_sdk_1.default.config.region = process.env.REGION;
app.set('view engine', 'pug');
app.use(express_1.default.static(path_1.default.join(__dirname + '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'build/index.html'));
});
// app.get('/', function (req, res) {
//     res.render('index', {
//         title: 'Krunal Mistry'
//     })
//     res.status(200).end();
// })
var port = process.env.PORT || '3046';
app.set('port', port);
var server = http_1.default.createServer(app);
server.listen(port, function () { return console.log("server is up!"); });
