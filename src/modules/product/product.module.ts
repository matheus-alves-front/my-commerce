import { Module } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './interfaces/product.repository.interface';
import { ProductRepository } from './database/product.repository';
import { ProductService } from './services/product.service';
import { PRODUCT_SERVICE } from './interfaces/product.service.interface';
import { ProductController } from './controllers/product.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
  ],
  controllers: [ProductController],
  exports: [PRODUCT_SERVICE, PRODUCT_REPOSITORY],
})
export class ProductModule {}
