import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  // connection_string: String(process.env.CONNECTION_STRING),
  port: Number(process.env.PORT),
};

export default config;
