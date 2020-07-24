import Express, {request, response} from 'express'
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


const port = process.env.PORT || '4000';
server.set('port', port);


server.listen(port, () => console.log(`React  Running on localhost:${port}`));