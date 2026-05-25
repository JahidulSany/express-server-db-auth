import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Root Route
app.get('/', async (req: Request, res: Response) => {
  await res.status(200).json({
    text: 'Welcome to Express API',
  });
});

// USERS ROUTE
app.use('/api/users', userRoute);

// PROFILES ROUTER
app.use('/api/profiles', profileRoute);

// Auth Route
app.use('/api/auth', authRoute);

export default app;
