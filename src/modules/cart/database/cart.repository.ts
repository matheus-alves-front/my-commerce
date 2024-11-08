import { ICartRepository, CART_REPOSITORY } from '../interfaces/cart.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CartDto } from '../dtos/cart.dto';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto): Promise<CartDto[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.cart.findMany({
      where: {
        customerId: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
      include: {
        cartItems: true,
      },
    });
  }

  async findByCustomerId(customerId: string): Promise<CartDto | null> {
    return this.prisma.cart.findUnique({
      where: { customerId },
      include: { cartItems: true },
    });
  }

  async create(data: Prisma.CartCreateInput): Promise<CartDto> {
    return this.prisma.cart.create({
      data,
      include: { cartItems: true },
    });
  }

  async update(customerId: string, data: Prisma.CartUpdateInput): Promise<CartDto> {
    return this.prisma.cart.update({
      where: { customerId },
      data,
      include: { cartItems: true },
    });
  }

  async delete(customerId: string): Promise<void> {
    await this.prisma.cart.delete({ where: { customerId } });
  }
}
