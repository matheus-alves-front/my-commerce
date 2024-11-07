// src/modules/customer/dtos/customer.dto.ts
import { Customer } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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

  @IsNotEmpty()
  phone?: string;

  // Outros campos
}

export class CustomerDto implements Customer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
