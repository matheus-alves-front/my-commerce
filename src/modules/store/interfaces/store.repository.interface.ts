import { Prisma, Store } from '@prisma/client';

export const STORE_REPOSITORY = Symbol('IStoreRepository');

export interface IStoreRepository {
  create(data: Prisma.StoreCreateInput): Promise<Store>;
  findById(id: string): Promise<Store | null>;
  findAll(): Promise<Store[]>;
  update(id: string, data: Prisma.StoreUpdateInput): Promise<Store>;
  delete(id: string): Promise<void>;
}
