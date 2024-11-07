import { User, Prisma } from '@prisma/client';

export const USER_REPOSITORY = Symbol('IUserRepository');
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<void>;
}
