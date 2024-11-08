import { Module } from '@nestjs/common';
import { STORE_SETTINGS_REPOSITORY } from './interfaces/store-settings.repository.interface';
import { StoreSettingsRepository } from './database/store-settings.repository';
import { STORE_SETTINGS_SERVICE } from './interfaces/store-settings.service.interface';
import { StoreSettingsService } from './services/store-settings.service';
import { StoreSettingsController } from './controllers/store-settings.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: STORE_SETTINGS_REPOSITORY,
      useClass: StoreSettingsRepository,
    },
    {
      provide: STORE_SETTINGS_SERVICE,
      useClass: StoreSettingsService,
    },
  ],
  controllers: [StoreSettingsController],
  exports: [STORE_SETTINGS_SERVICE, STORE_SETTINGS_REPOSITORY],
})
export class StoreSettingsModule {}
