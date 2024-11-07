// src/modules/store/store.module.ts

import { Module } from '@nestjs/common';
import { StoreRepository } from './database/store.repository';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { STORE_REPOSITORY } from './interfaces/store.repository.interface';
import { STORE_SERVICE } from './interfaces/store.service.interface';

@Module({
  providers: [
    {
      provide: STORE_REPOSITORY,
      useClass: StoreRepository,
    },
    {
      provide: STORE_SERVICE,
      useClass: StoreService,
    },
  ],
  controllers: [StoreController],
  exports: [STORE_SERVICE, STORE_REPOSITORY],
})
export class StoreModule {}
