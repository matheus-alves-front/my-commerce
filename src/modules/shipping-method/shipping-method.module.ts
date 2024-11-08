import { Module } from '@nestjs/common';
import { SHIPPING_METHOD_REPOSITORY } from './interfaces/shipping-method.repository.interface';
import { ShippingMethodRepository } from './database/shipping-method.repository';
import { SHIPPING_METHOD_SERVICE } from './interfaces/shipping-method.service.interface';
import { ShippingMethodService } from './services/shipping-method.service';
import { ShippingMethodController } from './controllers/shipping-method.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: SHIPPING_METHOD_REPOSITORY,
      useClass: ShippingMethodRepository,
    },
    {
      provide: SHIPPING_METHOD_SERVICE,
      useClass: ShippingMethodService,
    },
  ],
  controllers: [ShippingMethodController],
  exports: [SHIPPING_METHOD_SERVICE, SHIPPING_METHOD_REPOSITORY],
})
export class ShippingMethodModule {}
