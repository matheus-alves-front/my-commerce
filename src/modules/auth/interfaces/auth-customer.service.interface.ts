// src/modules/auth/interfaces/auth-customer.service.interface.ts

import { Customer } from '@prisma/client';
import { CreateCustomerDto } from 'src/modules/customer/dtos/customer.dto';
import { LoginDto } from '../dtos/auth.dto';

export const AUTH_CUSTOMER_SERVICE = Symbol('IAuthCustomerService');

export interface IAuthCustomerService {
  login(body: LoginDto): Promise<{ access_token: string }>;
  register(registerUserDto: CreateCustomerDto): Promise<{ access_token: string }>;
}
