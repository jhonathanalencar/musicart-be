declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SPOTIFY_API_AUTHORIZATION_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      PORT: number;
    }
  }
}

export {};
