// src/modules/auth/services/auth-customer.service.ts

import { Injectable, Inject, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthCustomerService, AUTH_CUSTOMER_SERVICE } from '../interfaces/auth-customer.service.interface';
import { ICustomerService, CUSTOMER_SERVICE } from '../../customer/interfaces/customer.service.interface';
import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateCustomerDto } from 'src/modules/customer/dtos/customer.dto';
import { LoginDto } from '../dtos/auth.dto';

@Injectable()
export class AuthCustomerService implements IAuthCustomerService {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customerService: ICustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = body;

    const user = await this.customerService.findByEmail(email);
    
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
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: CreateCustomerDto): Promise<{ access_token: string }> {
    const existingUser = await this.customerService.findByEmail(registerUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.password = hashedPassword;

    const user = await this.customerService.create({ ...registerUserDto });

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastname: user.lastName,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
