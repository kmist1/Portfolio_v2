"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var app = express_1.default();
var bodyParser = require('body-parser');
// Set region for AWS SDKs
aws_sdk_1.default.config.region = process.env.REGION;
app.set('view engine', 'pug');
app.set('build', __dirname + '/index.html');
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Krunal Mistry'
    });
    res.status(200).end();
});
var port = process.env.PORT || 8081;
app.listen(port, function () { return console.log("server is up!"); });
