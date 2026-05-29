import type { ROLE } from '../../utils/enum';

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  is_active?: boolean;
  role?: ROLE.USER;
}
