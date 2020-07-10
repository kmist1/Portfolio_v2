import Express, { Application, Request, Response } from 'express';
import path from 'path';
import AWS from 'aws-sdk';
import http from 'http';

const app: Application = Express();
const bodyParser = require('body-parser');


// Set region for AWS SDKs
AWS.config.region = process.env.REGION

app.set('view engine', 'pug')
app.use(Express.static(path.join(__dirname + '/build')));
app.use(bodyParser.urlencoded({extended:false}));

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,'build/index.html'));
})

// app.get('/', function (req, res) {
//     res.render('index', {
//         title: 'Krunal Mistry'
//     })
//     res.status(200).end();
// })


const port = process.env.PORT || '3046';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, ()=>console.log("server is up!"));