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

// Root Route
app.get('/', async (req: Request, res: Response) => {
  await res.send(`Hello Express..`);
});

// Get all Users
app.get('/api/users/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * from users
      `);
    res.status(200).json({
      success: true,
      message: 'Retrieved all users successfully',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      error: error,
    });
  }
});

// Get a specific User
app.get('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// Create a User
app.post('/api/users', async (req: Request, res: Response) => {
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

// Update a specific User Information
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE users SET name = $1, password = $2, age = $3, is_active = $4 WHERE id = $5 RETURNING *
      `,
      [name, password, age, is_active, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated sucessfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// Delete a Specific User

const port = config.port;
app.listen(port, () =>
  console.log(`Server is running at port http://localhost:${port}`),
);
