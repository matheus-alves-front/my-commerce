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

  async findById(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async create(customerInput: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data: customerInput });
  }

  async update(id: string, customerInput: Prisma.CustomerUpdateInput): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data: customerInput,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
