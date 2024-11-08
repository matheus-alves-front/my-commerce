import { StoreSettings } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateStoreSettingsDto, UpdateStoreSettingsDto } from '../dtos/store-settings.dto';

export const STORE_SETTINGS_SERVICE = Symbol('IStoreSettingsService');

export interface IStoreSettingsService {
  findAll(query: QueryDto): Promise<StoreSettings[]>;
  findByStoreId(storeId: string): Promise<StoreSettings>;
  create(storeId: string, createStoreSettingsDto: CreateStoreSettingsDto): Promise<StoreSettings>;
  update(storeId: string, updateStoreSettingsDto: UpdateStoreSettingsDto): Promise<StoreSettings>;
  delete(storeId: string): Promise<void>;
}
