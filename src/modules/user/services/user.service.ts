// src/modules/user/services/user.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { IUserService } from '../interfaces/user.service.interface';
import { IUserRepository, USER_REPOSITORY } from '../interfaces/user.repository.interface';
import { User } from '@prisma/client';
import { RegisterDto } from 'src/modules/auth/dtos/auth.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(registerDto: RegisterDto): Promise<User> {
    return this.userRepository.create({
      ...registerDto,
      role: 'ADMIN'
    });
  }

  // Implementar outros métodos
}
