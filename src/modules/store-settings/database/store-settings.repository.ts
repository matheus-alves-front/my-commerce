import { IStoreSettingsRepository } from '../interfaces/store-settings.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { StoreSettings, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

@Injectable()
export class StoreSettingsRepository implements IStoreSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDto): Promise<StoreSettings[]> {
    const { limit, offset, search, sortBy, sortOrder } = query;
    return this.prisma.storeSettings.findMany({
      where: {
        theme: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
    });
  }

  async findByStoreId(storeId: string): Promise<StoreSettings | null> {
    return this.prisma.storeSettings.findUnique({ where: { storeId } });
  }

  async create(data: Prisma.StoreSettingsCreateInput): Promise<StoreSettings> {
    return this.prisma.storeSettings.create({ data });
  }

  async update(storeId: string, data: Prisma.StoreSettingsUpdateInput): Promise<StoreSettings> {
    return this.prisma.storeSettings.update({
      where: { storeId },
      data,
    });
  }

  async delete(storeId: string): Promise<void> {
    await this.prisma.storeSettings.delete({ where: { storeId } });
  }
}
