import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsUUID, IsNumber } from 'class-validator';
import { ShippingMethod } from '@prisma/client';

export class ShippingMethodDto {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  deliveryTime: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(shippingMethod: ShippingMethod) {
    this.id = shippingMethod.id;
    this.storeId = shippingMethod.storeId;
    this.name = shippingMethod.name;
    this.description = shippingMethod.description;
    this.price = shippingMethod.price;
    this.deliveryTime = shippingMethod.deliveryTime;
    this.isActive = shippingMethod.isActive;
    this.createdAt = shippingMethod.createdAt;
    this.updatedAt = shippingMethod.updatedAt;
  }
}

export class CreateShippingMethodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  deliveryTime: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateShippingMethodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  deliveryTime?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}