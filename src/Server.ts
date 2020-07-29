import Express, {Request, Response} from 'express'
import Mongoose from 'mongoose'
import {User} from './persistance/User'
const path = require('path');
const http = require('http');


const server = Express();

// Specify where the compiled React app lives (copied the files manually from the client build)
const clientAppDirectory = path.join(__dirname, '../public', 'build');

server.use(Express.json());

// Middleware that allows users to get files from a directory on the server
server.use(Express.static(clientAppDirectory));


// Any other GET request that doesn't match previous routes should return the website
server.get('/*', (request, response) => {

    const indexPath = path.join(clientAppDirectory, 'index.html');

    return response.sendFile(indexPath);
});

Mongoose.connect('mongodb://localhost/portfolioV2', {useNewUrlParser: true});

Mongoose.connection.once('open', () => console.log("Connected to database!"));

// If User will contact me by name , email and message then will hit this route.

server.post('/contactMe',
    async (request: Request, response:Response) => {


    try{
        const name : string = request.body?.name;
        const email: string = request.body?.email;
        const message: string = request.body?.message;

        const existingUser = await User.findOne({email: {$eq: email}});
        console.log(`email is ${email}`);

        if(!existingUser) {
            const user = await User.create({name: name, email: email, message: message});
            response.send(user);
        }else{
            response.sendStatus(400);
        }

    } catch (error) {
        console.log('error creating new user', error.message);
    }

    });



const port = process.env.PORT || '4000';
server.set('port', port);


server.listen(port, () => console.log(`React  Running on localhost:${port}`));