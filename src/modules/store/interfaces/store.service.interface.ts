import { Store, User } from '@prisma/client';
import { CreateStoreDto, UpdateStoreDto } from '../dtos/store.dto';

export const STORE_SERVICE = Symbol('IStoreService');

export interface IStoreService {
  create(owner: User, createStoreDto: CreateStoreDto): Promise<Store>;
  findById(id: string): Promise<Store>;
  findAll(): Promise<Store[]>;
  update(user: User, id: string, updateStoreDto: UpdateStoreDto): Promise<Store>;
  delete(user: User, id: string): Promise<void>;
}
