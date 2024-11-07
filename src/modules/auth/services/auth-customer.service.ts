// src/modules/auth/services/auth-customer.service.ts

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IAuthCustomerService, AUTH_CUSTOMER_SERVICE } from '../interfaces/auth-customer.service.interface';
import { ICustomerService, CUSTOMER_SERVICE } from '../../customer/interfaces/customer.service.interface';
import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateCustomerDto } from 'src/modules/customer/dtos/customer.dto';

@Injectable()
export class AuthCustomerService implements IAuthCustomerService {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customerService: ICustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCustomer(email: string, password: string): Promise<Customer | null> {
    const customer = await this.customerService.findByEmail(email);
    if (customer && (await bcrypt.compare(password, customer.password))) {
      return customer;
    }
    return null;
  }

  async login(customer: Customer): Promise<{ accessToken: string }> {
    const payload = { sub: customer.id, email: customer.email, type: 'customer' };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerService.findByEmail(registerCustomerDto.email);
    if (existingCustomer) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerCustomerDto.password, 10);
    return this.customerService.create({ ...registerCustomerDto, password: hashedPassword });
  }
}
