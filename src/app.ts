import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import logger from './middlewares/logger';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

// Middlewares
app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(logger);
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

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

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
