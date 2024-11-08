// src/modules/store-settings/services/store-settings.service.ts
import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IStoreSettingsService } from '../interfaces/store-settings.service.interface';
import { IStoreSettingsRepository, STORE_SETTINGS_REPOSITORY } from '../interfaces/store-settings.repository.interface';
import { StoreSettings } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateStoreSettingsDto, UpdateStoreSettingsDto } from '../dtos/store-settings.dto';

@Injectable()
export class StoreSettingsService implements IStoreSettingsService {
  constructor(
    @Inject(STORE_SETTINGS_REPOSITORY)
    private readonly storeSettingsRepository: IStoreSettingsRepository,
  ) {}

  async findAll(query: QueryDto): Promise<StoreSettings[]> {
    return this.storeSettingsRepository.findAll(query);
  }

  async findByStoreId(storeId: string): Promise<StoreSettings> {
    const storeSettings = await this.storeSettingsRepository.findByStoreId(storeId);
    if (!storeSettings) {
      throw new NotFoundException('StoreSettings not found for the given storeId');
    }
    return storeSettings;
  }

  async create(storeId: string, createStoreSettingsDto: CreateStoreSettingsDto): Promise<StoreSettings> {
    const existingSettings = await this.storeSettingsRepository.findByStoreId(storeId);
    if (existingSettings) {
      throw new ConflictException('StoreSettings already exists for this store');
    }
    return this.storeSettingsRepository.create({
      ...createStoreSettingsDto,
      store: {
        connect: {
          id: storeId
        }
      }
    });
  }

  async update(storeId: string, updateStoreSettingsDto: UpdateStoreSettingsDto): Promise<StoreSettings> {
    const existingSettings = await this.storeSettingsRepository.findByStoreId(storeId);
    if (!existingSettings) {
      throw new NotFoundException('StoreSettings not found for the given storeId');
    }
    return this.storeSettingsRepository.update(storeId, {
      ...updateStoreSettingsDto,
    });
  }

  async delete(storeId: string): Promise<void> {
    const existingSettings = await this.storeSettingsRepository.findByStoreId(storeId);
    if (!existingSettings) {
      throw new NotFoundException('StoreSettings not found for the given storeId');
    }
    await this.storeSettingsRepository.delete(storeId);
  }
}
