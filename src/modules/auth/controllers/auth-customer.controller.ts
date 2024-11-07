// src/modules/auth/controllers/auth-customer.controller.ts

import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { IAuthCustomerService, AUTH_CUSTOMER_SERVICE } from '../interfaces/auth-customer.service.interface';
import { AuthCustomer } from '../../../common/decorators/auth-customer.decorator';
import { Customer } from '@prisma/client';
import { LocalAuthGuardCustomer } from '../guards/local-auth-customer.guard';
import { CreateCustomerDto } from 'src/modules/customer/dtos/customer.dto';

@Controller('auth/customer')
export class AuthCustomerController {
  constructor(
    @Inject(AUTH_CUSTOMER_SERVICE)
    private readonly authCustomerService: IAuthCustomerService,
  ) {}

  @UseGuards(LocalAuthGuardCustomer)
  @Post('login')
  async login(@AuthCustomer() customer: Customer) {
    return this.authCustomerService.login(customer);
  }

  @Post('register')
  async register(@Body() registerCustomerDto: CreateCustomerDto) {
    const customer = await this.authCustomerService.register(registerCustomerDto);
    return this.authCustomerService.login(customer);
  }
}
