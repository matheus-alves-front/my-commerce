import { Module } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from './interfaces/category.repository.interface';
import { CategoryRepository } from './database/category.repository';
import { CategoryService } from './services/category.service';
import { CATEGORY_SERVICE } from './interfaces/category.service.interface';
import { CategoryController } from './controllers/category.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
    {
      provide: CATEGORY_SERVICE,
      useClass: CategoryService,
    },
  ],
  controllers: [CategoryController],
  exports: [CATEGORY_SERVICE, CATEGORY_REPOSITORY],
})
export class CategoryModule {}
