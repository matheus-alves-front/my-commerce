// src/modules/customer/dtos/customer.dto.ts

import { Customer } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  phone?: string;

  // Outros campos opcionais podem ser adicionados aqui
}

export class UpdateCustomerDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  phone?: string;

  // Outros campos opcionais podem ser adicionados aqui
}

export class CustomerDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.email = customer.email;
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.phone = customer.phone;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
  }
}
