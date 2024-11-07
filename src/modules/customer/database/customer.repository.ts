// src/modules/customer/database/customer.repository.ts

import { ICustomerRepository } from '../interfaces/customer.repository.interface';
import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/modules/Prisma/prisma.service';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  async create(customerInput: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data: customerInput });
  }

  // Implementar outros métodos
}
