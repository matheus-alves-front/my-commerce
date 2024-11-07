// src/modules/user/database/user.repository.ts

import { IUserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/modules/Prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(registerInput: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: registerInput });
  }

  // Implementar outros métodos
}
