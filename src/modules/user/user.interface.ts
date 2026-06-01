enum ERole {
  admin = 'admin',
  agent = 'agent',
  user = 'user',
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  is_active?: boolean;
  role?: ERole.admin | ERole.agent | ERole.user;
}
