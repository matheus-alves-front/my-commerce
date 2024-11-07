// src/modules/customer/interfaces/customer.service.interface.ts

import { Customer } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

export const CUSTOMER_SERVICE = Symbol('ICustomerService');

export interface ICustomerService {
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  create(customerDto: CreateCustomerDto): Promise<Customer>;
  update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
  delete(id: string): Promise<void>;
}
