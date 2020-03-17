import 'reflect-metadata';
import * as express from 'express';
import { resolve } from 'path';
import { Router, ErrorRequestHandler } from 'express';

import { createConnection, Connection } from 'typeorm';

const connectDatabase = () => createConnection({
  type: 'sqlite',
  database: 'database/db.sqlite',
  entities: [resolve(__dirname, 'models/**/*.ts')],
  synchronize: true,
});

declare global {
  export namespace Express  {
    export interface Request {
      database: Connection;
    }
  }
}

export const startServer = (routes: Router[] = []) => {
  const app = express();

  app.disable('x-powered-by');


  // static
  
  app.use(express.static('public'));

  app.get('/', ({ }, res) => {
    res.sendFile('public/index.html');
  });


  // api

  app.use(express.json());

  app.use('/api', async (req, { }, next) => {
    req.database = await connectDatabase();
    next();
  });

  app.use('/api', routes);


  // error handling

  app.use('*', ({ }, res) => {
    res.sendStatus(404);
  });

  app.use(((error, { }, res, { }) => {
    console.error(error);
    res.sendStatus(500);
  }) as ErrorRequestHandler);


  // start server
  app.listen(4000, () => console.log('server started'));
};
