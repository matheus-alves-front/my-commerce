import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export const USER_SERVICE = Symbol('IUserService');

export interface IUserService {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
