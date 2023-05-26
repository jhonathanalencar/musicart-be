import { Router } from 'express';
import axios, { AxiosError } from 'axios';

const authRoutes = Router();

interface AuthorizeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

authRoutes.get('/authorize', async (request, response) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  try {
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
  } catch (error) {
    console.error(error);

    let statusCode = 500;
    let message = 'Something went wrong. Try later.';

    if (error instanceof AxiosError) {
      statusCode = error.response?.status ?? statusCode;
      message = error.response?.data ?? message;
    }

    return response.status(statusCode).json({ error: message });
  }
});

export { authRoutes };
