// src/modules/customer/interfaces/customer.repository.interface.ts

import { Customer, Prisma } from '@prisma/client';

export const CUSTOMER_REPOSITORY = Symbol('ICustomerRepository');

export interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  create(customerInput: Prisma.CustomerCreateInput): Promise<Customer>;
  update(id: string, customerInput: Prisma.CustomerUpdateInput): Promise<Customer>;
  delete(id: string): Promise<void>;
}
