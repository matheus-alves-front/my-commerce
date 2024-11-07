// src/modules/auth/interfaces/auth-user.service.interface.ts

import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dtos/user.dto';

export const AUTH_USER_SERVICE = Symbol('IAuthUserService');

export interface IAuthUserService {
  validateUser(email: string, password: string): Promise<User | null>;
  login(user: User): Promise<{ accessToken: string }>;
  register(registerUserDto: CreateUserDto): Promise<User>;
}
