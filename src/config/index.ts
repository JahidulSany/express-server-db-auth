import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  port: Number(process.env.PORT),
  connection_string: String(process.env.CONNECTION_STRING),
  secret_key: process.env.JWT_SECRET,
  refresh_secret_key: process.env.JWT_REFRESH_SECRET,
};

export default config;
