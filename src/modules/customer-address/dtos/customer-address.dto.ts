import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';
import { Address } from '@prisma/client';

export class AddressDto {
  id: string;
  customerId: string;
  fullName: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(address: Address) {
    this.id = address.id;
    this.customerId = address.customerId;
    this.fullName = address.fullName;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.neighborhood = address.neighborhood;
    this.city = address.city;
    this.state = address.state;
    this.postalCode = address.postalCode;
    this.country = address.country;
    this.phone = address.phone;
    this.isDefault = address.isDefault;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }
}

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean = false;
}
