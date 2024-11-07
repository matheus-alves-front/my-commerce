// src/modules/customer/interfaces/customer.repository.interface.ts

import { Customer, Prisma } from '@prisma/client';

export const CUSTOMER_REPOSITORY = Symbol('ICustomerRepository');

export interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>;
  create(customerInput: Prisma.CustomerCreateInput): Promise<Customer>;
  // Outros métodos
}
