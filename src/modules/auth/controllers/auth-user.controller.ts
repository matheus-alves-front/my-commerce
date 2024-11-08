import { Controller, Post, Body, Inject } from '@nestjs/common';
import { IAuthUserService, AUTH_USER_SERVICE } from '../interfaces/auth-user.service.interface';
import { CreateUserDto } from 'src/modules/user/dtos/user.dto';
import { LoginDto } from '../dtos/auth.dto';

@Controller('auth/user')
export class AuthUserController {
  constructor(
    @Inject(AUTH_USER_SERVICE)
    private readonly authUserService: IAuthUserService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authUserService.login(body);
  }

  @Post('register')
  async register(@Body() registerUserDto: CreateUserDto) {
    return await this.authUserService.register(registerUserDto);
  }
}
