import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  otsPort: process.env.OTS_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXPIRATION,
  env: process.env.NODE_ENV,
  marvelUrl: process.env.MARVEL_URL,
  publicApiKey: process.env.MARVEL_PUBLIC_API_KEY,
  privateApiKey: process.env.MARVEL_PRIVATE_API_KEY,
}));
