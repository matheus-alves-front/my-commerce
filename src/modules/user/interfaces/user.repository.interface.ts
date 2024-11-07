// src/modules/user/interfaces/user.repository.interface.ts

import { User, Prisma } from '@prisma/client';

export const USER_REPOSITORY = Symbol('IUserRepository');

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(registerInput: Prisma.UserCreateInput): Promise<User>;
  // Outros métodos
}
