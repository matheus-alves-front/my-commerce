import { IStoreRepository } from '../interfaces/store.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.StoreCreateInput): Promise<Store> {
    return this.prisma.store.create({ data });
  }

  async findById(id: string): Promise<Store | null> {
    return this.prisma.store.findUnique({ where: { id } });
  }

  async findAll(): Promise<Store[]> {
    return this.prisma.store.findMany();
  }

  async update(id: string, data: Prisma.StoreUpdateInput): Promise<Store> {
    return this.prisma.store.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.store.delete({ where: { id } });
  }
}
