import { Category } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

export const CATEGORY_SERVICE = Symbol('ICategoryService');

export interface ICategoryService {
  findAll(query: QueryDto): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  create(storeId: string, createCategoryDto: CreateCategoryDto): Promise<Category>;
  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  delete(id: string): Promise<void>;
}
