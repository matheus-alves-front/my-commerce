// src/modules/customer/services/customer.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { ICustomerService } from '../interfaces/customer.service.interface';
import { CUSTOMER_REPOSITORY, ICustomerRepository } from '../interfaces/customer.repository.interface';
import { Customer } from '@prisma/client';
import { CreateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findByEmail(email);
  }

  async create(customerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.create({
      ...customerDto
    });
  }

  // Implementar outros métodos
}
