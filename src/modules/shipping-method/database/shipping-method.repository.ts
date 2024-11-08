import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { ShippingMethod, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { IShippingMethodRepository } from '../interfaces/shipping-method.repository.interface';

@Injectable()
export class ShippingMethodRepository implements IShippingMethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(storeId: string, query: QueryDto): Promise<ShippingMethod[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.shippingMethod.findMany({
      where: {
        storeId,
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

  async findById(id: string): Promise<ShippingMethod | null> {
    return this.prisma.shippingMethod.findUnique({ where: { id } });
  }

  async create(data: Prisma.ShippingMethodCreateInput): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.create({ data });
  }

  async update(id: string, data: Prisma.ShippingMethodUpdateInput): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.shippingMethod.delete({ where: { id } });
  }
}
