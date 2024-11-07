import { Store } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}

export class UpdateStoreDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;
}

export class StoreDto {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(store: Store) {
    this.id = store.id;
    this.name = store.name;
    this.description = store.description;
    this.ownerId = store.ownerId;
    this.createdAt = store.createdAt;
    this.updatedAt = store.updatedAt;
  }
}
