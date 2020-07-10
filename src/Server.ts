import Express, { Application, Request, Response } from 'express';

const app: Application = Express();



app.listen(5000, ()=>console.log("server is up!"));