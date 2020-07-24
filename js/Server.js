"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
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
var port = process.env.PORT || '4000';
server.set('port', port);
server.listen(port, function () { return console.log("React  Running on localhost:" + port); });
