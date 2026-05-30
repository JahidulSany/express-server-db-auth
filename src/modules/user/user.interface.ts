import type { ERole } from '../auth/auth.interface';

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  is_active?: boolean;
  role?: ERole.admin | ERole.agent | ERole.user;
}
