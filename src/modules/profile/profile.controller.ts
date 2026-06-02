import type { Request, Response } from 'express';
import { profileService } from './profile.service';
import sendResponse from '../../utils/sendResponse';

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileFromDB(req.body);
    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Profile not found',
        data: {},
      });
    }
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Profile Created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  createProfile,
};
