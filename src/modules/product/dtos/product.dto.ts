import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber, IsInt, Min, IsArray } from 'class-validator';
import { Product, Category, Image, Attribute, Review } from '@prisma/client';

export class ProductDto {
  id: string;
  name: string;
  description?: string;
  slug: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  categories?: Category[];
  images?: Image[];
  attributes?: Attribute[];
  reviews?: Review[];

  constructor(product: Product & {
    categories?: Category[];
    images?: Image[];
    attributes?: Attribute[];
    reviews?: Review[];
  }) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.slug = product.slug;
    this.price = product.price;
    this.salePrice = product.salePrice;
    this.sku = product.sku;
    this.stock = product.stock;
    this.storeId = product.storeId;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
    this.categories = product.categories;
    this.images = product.images;
    this.attributes = product.attributes;
    this.reviews = product.reviews;
  }
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsUUID()
  storeId: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds?: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsUUID()
  storeId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds?: string[];
}
