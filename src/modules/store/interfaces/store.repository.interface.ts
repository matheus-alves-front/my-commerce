// src/modules/store/interfaces/store.repository.interface.ts

import { Prisma, Store } from '@prisma/client';

export const STORE_REPOSITORY = Symbol('IStoreRepository');

export interface IStoreRepository {
  create(storeInput: Prisma.StoreCreateInput): Promise<Store>;
  findById(id: string): Promise<Store | null>;
  // Outros métodos
}
