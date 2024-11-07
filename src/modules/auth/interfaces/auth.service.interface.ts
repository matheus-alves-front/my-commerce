// src/modules/auth/interfaces/auth.service.interface.ts

import { User } from '@prisma/client';
import { RegisterDto } from '../dtos/auth.dto';

export const AUTH_SERVICE = Symbol('IAuthService');

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User | null>;
  login(user: User): Promise<{ accessToken: string }>;
  register(registerDto: RegisterDto): Promise<User>;
}
