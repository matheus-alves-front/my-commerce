import { IAttributeRepository, ATTRIBUTE_REPOSITORY } from '../interfaces/attribute.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { Attribute, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

@Injectable()
export class AttributeRepository implements IAttributeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto): Promise<Attribute[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.attribute.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
      include: {
        attributeType: true,
      },
    });
  }

  async findById(id: string): Promise<Attribute | null> {
    return this.prisma.attribute.findUnique({
      where: { id },
      include: { attributeType: true },
    });
  }

  async create(data: Prisma.AttributeCreateInput): Promise<Attribute> {
    return this.prisma.attribute.create({
      data,
      include: { attributeType: true },
    });
  }

  async update(id: string, data: Prisma.AttributeUpdateInput): Promise<Attribute> {
    return this.prisma.attribute.update({
      where: { id },
      data,
      include: { attributeType: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.attribute.delete({ where: { id } });
  }
}
