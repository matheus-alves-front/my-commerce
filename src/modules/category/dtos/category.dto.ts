import { Category, Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryDto {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.parentId = category.parentId;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}

export class CreateCategoryDto implements CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  slug: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}

