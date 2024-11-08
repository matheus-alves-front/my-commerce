// src/modules/attribute/dtos/create-attribute.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Attribute, AttributeType } from '@prisma/client';

export class AttributeDto {
  id: string;
  name: string;
  value: string;
  productId: string;
  attributeTypeId: string;
  createdAt: Date;
  updatedAt: Date;
  attributeType?: AttributeType;

  constructor(attribute: Attribute & { attributeType?: AttributeType }) {
    this.id = attribute.id;
    this.name = attribute.name;
    this.value = attribute.value;
    this.productId = attribute.productId;
    this.attributeTypeId = attribute.attributeTypeId;
    this.attributeType = attribute.attributeType;
  }
}

export class CreateAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  attributeTypeId: string;
}

export class UpdateAttributeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsOptional()
  @IsUUID()
  attributeTypeId?: string;
}