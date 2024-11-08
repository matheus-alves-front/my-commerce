import { Module } from '@nestjs/common';
import { CART_REPOSITORY } from './interfaces/cart.repository.interface';
import { CartRepository } from './database/cart.repository';
import { CART_SERVICE } from './interfaces/cart.service.interface';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: CART_REPOSITORY,
      useClass: CartRepository,
    },
    {
      provide: CART_SERVICE,
      useClass: CartService,
    },
  ],
  controllers: [CartController],
  exports: [CART_SERVICE, CART_REPOSITORY],
})
export class CartModule {}
