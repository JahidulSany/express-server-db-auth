import bcrypt from 'bcryptjs';
import { pool } from '../../db';
import type { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
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
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.SECRET_Key as string, {
    expiresIn: '1d',
  });

  return { accessToken };
};

export const authService = {
  loginUserFromDB,
};
