import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import config from './utils';
import { Pool } from 'pg';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(error);
  }
};
initDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!!!');
});

app.post('/', (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json({
    message: 'Data retrieved successfully',
    data: body,
  });
});

const port = config.port;
app.listen(port, () =>
  console.log(`Server is running at port http://localhost:${port}`),
);
