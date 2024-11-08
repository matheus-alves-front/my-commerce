import { IsNotEmpty, IsString, IsOptional, IsJSON } from 'class-validator';
import { StoreSettings } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class StoreSettingsDto {
  id: string;
  storeId: string;
  theme: string;
  currency: string;
  language: string;
  customStyles?: JsonValue;
  createdAt: Date;
  updatedAt: Date;

  constructor(storeSettings: StoreSettings) {
    this.id = storeSettings.id;
    this.storeId = storeSettings.storeId;
    this.theme = storeSettings.theme;
    this.currency = storeSettings.currency;
    this.language = storeSettings.language;
    this.customStyles = storeSettings.customStyles;
    this.createdAt = storeSettings.createdAt;
    this.updatedAt = storeSettings.updatedAt;
  }
}

export class CreateStoreSettingsDto {
  @IsNotEmpty()
  @IsString()
  theme: string;

  @IsOptional()
  @IsString()
  currency?: string = 'USD';

  @IsOptional()
  @IsString()
  language?: string = 'en';

  @IsOptional()
  @IsJSON()
  customStyles?: Record<string, any>;
}

export class UpdateStoreSettingsDto {
  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsJSON()
  customStyles?: Record<string, any>;
}
