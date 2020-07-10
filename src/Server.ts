import Express, { Application, Request, Response } from 'express';

import AWS from 'aws-sdk';

const app: Application = Express();
const bodyParser = require('body-parser');


// Set region for AWS SDKs
AWS.config.region = process.env.REGION

app.set('view engine', 'pug')
app.set('build', __dirname + '/index.html')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Krunal Mistry'
    })
    res.status(200).end();
})

var port = process.env.PORT || 8081




app.listen(port, ()=>console.log("server is up!"));