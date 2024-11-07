import { IStoreRepository } from '../interfaces/store.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from 'src/common/modules/Prisma/prisma.service';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(storeInput: Prisma.StoreCreateInput): Promise<Store> {
    return this.prisma.store.create({ data: storeInput });
  }

  async findById(id: string): Promise<Store | null> {
    return this.prisma.store.findUnique({ where: { id } });
  }

  // Implementar outros métodos
}
