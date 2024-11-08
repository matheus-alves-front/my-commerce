import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ICustomerService } from '../interfaces/customer.service.interface';
import { ICustomerRepository, CUSTOMER_REPOSITORY } from '../interfaces/customer.repository.interface';
import { Customer } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findByEmail(email);
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findByEmail(createCustomerDto.email);
    if (existingCustomer) {
      throw new ForbiddenException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);
    return this.customerRepository.create({
      ...createCustomerDto,
      password: hashedPassword,
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    // const customer = await this.findById(id);

    if (updateCustomerDto.email) {
      const existingCustomer = await this.customerRepository.findByEmail(updateCustomerDto.email);
      if (existingCustomer && existingCustomer.id !== id) {
        throw new ForbiddenException('Email already in use');
      }
    }

    return this.customerRepository.update(id, updateCustomerDto);
  }

  async delete(id: string): Promise<void> {
    const customer = await this.findById(id);
    await this.customerRepository.delete(id);
  }
}
