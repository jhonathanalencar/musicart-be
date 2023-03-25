import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

interface AuthorizeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

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
