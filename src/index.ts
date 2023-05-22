import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router)

app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

app.get('^/$|/index(.html)?', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.all('*', (request, response) => {
  response.status(404);

  if (request.accepts('html')) {
    response.sendFile(path.resolve(__dirname, 'views', '404.html'));
  } else if (request.accepts('json')) {
    response.json({ message: '404 Not Found' });
  } else {
    response.type('txt').send('404 Not Found');
  }
});

export { app };
