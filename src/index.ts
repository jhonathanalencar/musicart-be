import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'node:path';

const app = express();

app.use(express.json());
app.use(cors());

interface AuthorizeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

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

app.get('/auth/authorize', async (request, response) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const { data } = await axios.post<AuthorizeResponse>(
    process.env.SPOTIFY_API_AUTHORIZATION_URL,
    {
      grant_type: 'client_credentials',
    },
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.status(200).json({ access_token: data.access_token });
});

export { app };
