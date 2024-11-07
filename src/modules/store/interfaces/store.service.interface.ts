// src/modules/store/interfaces/store.service.interface.ts

import { Store, User } from '@prisma/client';
import { CreateStoreDto } from '../dtos/store.dto';

export const STORE_SERVICE = Symbol('IStoreService');

export interface IStoreService {
  create(owner: User, createStoreDto: CreateStoreDto): Promise<Store>;
  findById(id: string): Promise<Store | null>;
  // Outros métodos
}
