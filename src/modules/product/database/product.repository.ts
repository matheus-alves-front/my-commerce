import { IProductRepository } from '../interfaces/product.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto): Promise<Product[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
      skip: offset,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
      include: {
        categories: true,
        images: true,
        attributes: true,
        reviews: true,
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        images: true,
        attributes: true,
        reviews: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        categories: true,
        images: true,
        attributes: true,
        reviews: true,
      },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
      include: {
        categories: true,
        images: true,
        attributes: true,
        reviews: true,
      },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        categories: true,
        images: true,
        attributes: true,
        reviews: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
