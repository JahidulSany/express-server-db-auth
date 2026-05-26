import type { NextFunction, Request, Response } from 'express';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('This is a protected route!!!!');
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Unauthorised Access!!!',
      });
    }
    next();
  };
};

export default auth;
