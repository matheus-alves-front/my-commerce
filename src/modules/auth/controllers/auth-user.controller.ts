// src/modules/auth/controllers/auth-user.controller.ts

import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { IAuthUserService, AUTH_USER_SERVICE } from '../interfaces/auth-user.service.interface';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { LocalAuthGuardUser } from '../guards/local-auth-user.guard';
import { CreateUserDto } from 'src/modules/user/dtos/user.dto';

@Controller('auth/user')
export class AuthUserController {
  constructor(
    @Inject(AUTH_USER_SERVICE)
    private readonly authUserService: IAuthUserService,
  ) {}

  @UseGuards(LocalAuthGuardUser)
  @Post('login')
  async login(@AuthUser() user: User) {
    return this.authUserService.login(user);
  }

  @Post('register')
  async register(@Body() registerUserDto: CreateUserDto) {
    const user = await this.authUserService.register(registerUserDto);
    return this.authUserService.login(user);
  }
}
