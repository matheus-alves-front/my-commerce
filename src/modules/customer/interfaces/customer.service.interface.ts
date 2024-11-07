// src/modules/customer/interfaces/customer.service.interface.ts

import { Customer } from '@prisma/client';
import { CreateCustomerDto } from '../dtos/customer.dto';

export const CUSTOMER_SERVICE = Symbol('ICustomerService');

export interface ICustomerService {
  findByEmail(email: string): Promise<Customer | null>;
  create(customerDto: CreateCustomerDto): Promise<Customer>;
  // Outros métodos
}
