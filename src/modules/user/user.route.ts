import { Router, type Request, type Response } from 'express';
import { userController } from './user.controller';

const router = Router();

// Create a User
router.post('/', userController.createUser);

// Get all Users
router.get('/', userController.getAllUsers);

// Get a specific User
router.get('/:id', userController.getSingleUser);

// Update a specific User Information
router.put('/:id', userController.updateUser);

// Delete a Specific User
router.delete('/:id', userController.deleteUser);

export const userRoute = router;
