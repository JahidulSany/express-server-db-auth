import bcrypt from 'bcryptjs';
import { pool } from '../../db';
import type { ILoginUser } from './auth.interface';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../../utils';

const loginUserFromDB = async (payload: ILoginUser) => {
  // Checking If User Exists
  const { email, password } = payload;

  const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error('Invalid Credentials');
  }

  const user = userData.rows[0];

  // Comparing Password
  const matchedPassword = await bcrypt.compare(password, user.password);
  console.log(matchedPassword);
  if (!matchedPassword) {
    throw new Error('Invalid Credentials');
  }

  // Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret_key as string, {
    expiresIn: '1d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.refresh_secret_key as string,
    {
      expiresIn: '1d',
    },
  );

  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Unauthorised Access!!!');
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret_key as string,
  ) as JwtPayload;

  console.log(decoded);

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
      `,
    [decoded.email],
  );

  if (userData.rows.length === 0) {
    throw new Error('User not found!!!');
  }

  const user = userData.rows[0];

  if (!user?.is_active) {
    throw new Error('Forbidden: You do not have permission.');
  }

  // Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret_key as string, {
    expiresIn: '1d',
  });

  return { accessToken };
};

export const authService = {
  loginUserFromDB,
  generateRefreshToken,
};
