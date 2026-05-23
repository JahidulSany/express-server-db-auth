import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Root Route
app.get('/', async (req: Request, res: Response) => {
  await res.send(`Hello Express..`);
});

// USERS ROUTE
app.use('/api/users', userRoute);

// PROFILES ROUTER
app.use('/api/profiles', profileRoute);

export default app;
