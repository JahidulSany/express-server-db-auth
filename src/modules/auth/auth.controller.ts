import type { Request, Response } from 'express';
import { authService } from './auth.service';

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserFromDB(req.body);

    // if (result.rows.length === 0) {
    //   res.status(404).json({
    //     success: false,
    //     message: `User not found`,
    //     data: {},
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'User successfully logged in.',
      data: result,
    });

    return result;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

export const authController = {
  loginUser,
};
