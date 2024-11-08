import { StoreSettings, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const STORE_SETTINGS_REPOSITORY = Symbol('IStoreSettingsRepository');

export interface IStoreSettingsRepository {
  findAll(query: QueryDto): Promise<StoreSettings[]>;
  findByStoreId(storeId: string): Promise<StoreSettings | null>;
  create(data: Prisma.StoreSettingsCreateInput): Promise<StoreSettings>;
  update(storeId: string, data: Prisma.StoreSettingsUpdateInput): Promise<StoreSettings>;
  delete(storeId: string): Promise<void>;
}
