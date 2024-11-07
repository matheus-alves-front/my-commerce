// src/modules/auth/strategies/jwt-customer.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Customer } from '@prisma/client';
import { ICustomerService, CUSTOMER_SERVICE } from '../../customer/interfaces/customer.service.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtCustomerStrategy extends PassportStrategy(Strategy, 'jwt-customer') {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customerService: ICustomerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret', // Utilize variável de ambiente
    });
  }

  async validate(payload: any): Promise<Customer> {
    if (payload.type !== 'customer') {
      return null;
    }
    const customer = await this.customerService.findById(payload.sub);
    if (!customer) {
      return null;
    }
    return customer;
  }
}
