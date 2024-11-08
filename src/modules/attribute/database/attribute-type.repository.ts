import { IAttributeTypeRepository, ATTRIBUTE_TYPE_REPOSITORY } from '../interfaces/attribute-type.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { AttributeType, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

@Injectable()
export class AttributeTypeRepository implements IAttributeTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto): Promise<AttributeType[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.attributeType.findMany({
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

  async findById(id: string): Promise<AttributeType | null> {
    return this.prisma.attributeType.findUnique({ where: { id } });
  }

  async create(data: Prisma.AttributeTypeCreateInput): Promise<AttributeType> {
    return this.prisma.attributeType.create({ data });
  }

  async update(id: string, data: Prisma.AttributeTypeUpdateInput): Promise<AttributeType> {
    return this.prisma.attributeType.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.attributeType.delete({ where: { id } });
  }
}
