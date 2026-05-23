import type { Request, Response } from 'express';
import { profileService } from './profile.service';

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileFromDB(req.body);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
        data: {},
      });
    }
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

export const profileController = {
  createProfile,
};
