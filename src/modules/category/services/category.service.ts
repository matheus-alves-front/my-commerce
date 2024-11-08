// src/modules/category/services/category.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICategoryService } from '../interfaces/category.service.interface';
import { ICategoryRepository, CATEGORY_REPOSITORY } from '../interfaces/category.repository.interface';
import { Category } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll(query: QueryDto): Promise<Category[]> {
    return this.categoryRepository.findAll(query);
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(storeId: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create({
      ...createCategoryDto,
      store: {
        connect: {
          id: storeId
        }
      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepository.update(id, {
      ...updateCategoryDto,
    });
  }

  async delete(id: string): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.delete(id);
  }
}
