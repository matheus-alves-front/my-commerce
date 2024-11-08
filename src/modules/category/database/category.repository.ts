import { ICategoryRepository, CATEGORY_REPOSITORY } from '../interfaces/category.repository.interface';
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto): Promise<Category[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.category.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
    });
  }

  async findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
