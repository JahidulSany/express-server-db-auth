import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { pool } from '../db';
import { type TUserRole } from '../modules/auth/auth.interface';

const auth = (...roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(roles);
      // console.log('This is a protected route!!!!');

      const token = req.headers.authorization;
      // console.log(token);

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Unauthorised Access!!!',
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret_key as string,
      ) as JwtPayload;

      console.log(decoded);

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
      `,
        [decoded.email],
      );

      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: 'User not found!!!',
        });
      }

      const user = userData.rows[0];

      if (!user?.is_active) {
        res.status(403).json({
          success: false,
          message: 'Forbidden: You do not have permission.',
        });
      }

      // console.log(user.role);

      if (roles.length && !roles.includes(user.role)) {
        res.status(403).json({
          success: false,
          message: 'Forbidden: You do not have permission.',
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
