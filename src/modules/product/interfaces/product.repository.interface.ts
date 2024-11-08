import { Product, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const PRODUCT_REPOSITORY = Symbol('IProductRepository');

export interface IProductRepository {
  findAll(query: QueryDto): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
  delete(id: string): Promise<void>;
}
