// src/modules/user/controllers/user.controller.ts

import { Controller, Get, UseGuards, Inject } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '../interfaces/user.service.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@AuthUser() user: User) {
    // Retorna o perfil do usuário autenticado
    return user;
  }

  // Outros endpoints
}
