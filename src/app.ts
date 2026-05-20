import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { pool } from './db';
import { userRoute } from './modules/user/user.route';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Root Route
app.get('/', async (req: Request, res: Response) => {
  await res.send(`Hello Express..`);
});

app.use('/api/users', userRoute);

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

// Update a specific User Information
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE users
      SET name = COALESCE($1, name), password = COALESCE($2,password), age = COALESCE($3, age), is_active = COALESCE($4, is_active)
      WHERE id = $5 RETURNING *`,
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
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id=$1`,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        succuss: false,
        message: 'User not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted sucessfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export default app;
