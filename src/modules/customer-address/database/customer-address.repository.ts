import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { Address, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { ICustomerAddressRepository } from '../interfaces/customer-address.repository.interface';

@Injectable()
export class CustomerAddressRepository implements ICustomerAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(customerId: string, query: QueryDto): Promise<Address[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.address.findMany({
      where: {
        customerId,
        OR: [
          { street: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
          { state: { contains: search, mode: 'insensitive' } },
        ],
      },
      skip: offset,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
    });
  }

  async findById(id: string): Promise<Address | null> {
    return this.prisma.address.findUnique({ where: { id } });
  }

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({ data });
  }

  async update(id: string, data: Prisma.AddressUpdateInput): Promise<Address> {
    return this.prisma.address.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.address.delete({ where: { id } });
  }
}
