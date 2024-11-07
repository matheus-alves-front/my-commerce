import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { AUTH_SERVICE, IAuthService } from '../interfaces/auth.service.interface';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { RegisterDto } from '../dtos/auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AuthUser() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return this.authService.login(user);
  }
}
