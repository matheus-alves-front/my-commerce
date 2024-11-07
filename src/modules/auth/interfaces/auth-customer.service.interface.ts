// src/modules/auth/interfaces/auth-customer.service.interface.ts

import { Customer } from '@prisma/client';
import { CreateCustomerDto } from 'src/modules/customer/dtos/customer.dto';

export const AUTH_CUSTOMER_SERVICE = Symbol('IAuthCustomerService');

export interface IAuthCustomerService {
  validateCustomer(email: string, password: string): Promise<Customer | null>;
  login(customer: Customer): Promise<{ accessToken: string }>;
  register(registerCustomerDto: CreateCustomerDto): Promise<Customer>;
}
