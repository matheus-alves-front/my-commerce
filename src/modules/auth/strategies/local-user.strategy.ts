// src/modules/auth/strategies/local-user.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthUserService, AUTH_USER_SERVICE } from '../interfaces/auth-user.service.interface';
import { Inject } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy, 'local-user') {
  constructor(
    @Inject(AUTH_USER_SERVICE)
    private readonly authUserService: IAuthUserService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authUserService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
