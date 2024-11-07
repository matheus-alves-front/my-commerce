// src/modules/auth/strategies/local-customer.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthCustomerService, AUTH_CUSTOMER_SERVICE } from '../interfaces/auth-customer.service.interface';
import { Inject } from '@nestjs/common';
import { Customer } from '@prisma/client';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(Strategy, 'local-customer') {
  constructor(
    @Inject(AUTH_CUSTOMER_SERVICE)
    private readonly authCustomerService: IAuthCustomerService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Customer> {
    const customer = await this.authCustomerService.validateCustomer(email, password);
    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return customer;
  }
}
