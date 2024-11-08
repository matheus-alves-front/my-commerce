import { AttributeType } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AttributeTypeDto {
  id: string;
  name: string;
  type: string;

  constructor(attribute: AttributeType) {
    this.id = attribute.id;
    this.name = attribute.name;
    this.type = attribute.type;
  }
}

export class CreateAttributeTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class UpdateAttributeTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}