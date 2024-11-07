import { Store } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  ownerId: string;
}

export class StoreDto implements Store {
  name: string;
  description: string;
  ownerId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}