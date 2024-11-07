// src/modules/user/interfaces/user.service.interface.ts

import { User } from '@prisma/client';
import { RegisterDto } from 'src/modules/auth/dtos/auth.dto';

export const USER_SERVICE = Symbol('IUserService');

export interface IUserService {
  findByEmail(email: string): Promise<User | null>;
  create(registerDto: RegisterDto): Promise<User>;
  // Outros métodos
}
