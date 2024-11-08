import { Category, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const CATEGORY_REPOSITORY = Symbol('ICategoryRepository');

export interface ICategoryRepository {
  findAll(query: QueryDto): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
  delete(id: string): Promise<void>;
}
