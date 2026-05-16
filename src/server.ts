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
