import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';
import { CUSTOMER_ADDRESS_REPOSITORY } from './interfaces/customer-address.repository.interface';
import { CustomerAddressRepository } from './database/customer-address.repository';
import { CUSTOMER_ADDRESS_SERVICE } from './interfaces/customer-address.service.interface';
import { CustomerAddressService } from './services/customer-address.service';
import { AddressController } from './controllers/customer-address.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: CUSTOMER_ADDRESS_REPOSITORY,
      useClass: CustomerAddressRepository,
    },
    {
      provide: CUSTOMER_ADDRESS_SERVICE,
      useClass: CustomerAddressService,
    },
  ],
  controllers: [AddressController],
  exports: [CUSTOMER_ADDRESS_SERVICE, CUSTOMER_ADDRESS_REPOSITORY],
})
export class AddressModule {}
