// src/modules/auth/services/auth-user.service.ts

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IAuthUserService, AUTH_USER_SERVICE } from '../interfaces/auth-user.service.interface';
import { IUserService, USER_SERVICE } from '../../user/interfaces/user.service.interface';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/user.dto';

@Injectable()
export class AuthUserService implements IAuthUserService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role, type: 'user' };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findByEmail(registerUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    return this.userService.create({ ...registerUserDto, password: hashedPassword });
  }
}
