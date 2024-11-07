// src/modules/auth/strategies/jwt-user.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
import { IUserService, USER_SERVICE } from '../../user/interfaces/user.service.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret', // Utilize variável de ambiente
    });
  }

  async validate(payload: any): Promise<User> {
    if (payload.type !== 'user') {
      return null;
    }
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}
