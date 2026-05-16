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
      email VARCHAR(20) UNIQUE NOT NULL,
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

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Hello World!!!');
});

app.post('/', async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [name, email, password, age],
    );

    console.log(result);

    res.status(201).json({
      message: 'User Created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

const port = config.port;
app.listen(port, () =>
  console.log(`Server is running at port http://localhost:${port}`),
);
