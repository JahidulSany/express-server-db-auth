import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
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

// Middlewares
app.use('/api/users', userRoute);

export default app;
