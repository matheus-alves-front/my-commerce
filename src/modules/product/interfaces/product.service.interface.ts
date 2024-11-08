import { Product } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export const PRODUCT_SERVICE = Symbol('IProductService');

export interface IProductService {
  findAll(query: QueryDto): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findBySlug(slug: string): Promise<Product>;
  create(createProductDto: CreateProductDto): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
}
