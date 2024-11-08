// auth-user.service.ts
import { Injectable, Inject, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthUserService } from '../interfaces/auth-user.service.interface';
import { IUserService, USER_SERVICE } from '../../user/interfaces/user.service.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dtos/user.dto';
import { LoginDto } from '../dtos/auth.dto';

@Injectable()
export class AuthUserService implements IAuthUserService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      throw new HttpException('Conta com esse email não existe', HttpStatus.UNAUTHORIZED);
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    // const validatePassword = password === user.password;

    if (!validatePassword) {
      throw new HttpException('Credenciais Inválidas', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastname: user.lastName,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findByEmail(registerUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.password = hashedPassword;

    const user = await this.userService.create({ ...registerUserDto });

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastname: user.lastName,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
