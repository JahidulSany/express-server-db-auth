import { Router, type Request, type Response } from 'express';
import { userController } from './user.controller';

const router = Router();

// Create a User
router.post('/', userController.createUser);

export const userRoute = router;
