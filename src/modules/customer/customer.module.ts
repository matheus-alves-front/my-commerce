// src/modules/customer/customer.module.ts

import { Module } from '@nestjs/common';
import { CustomerRepository } from './database/customer.repository';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { CUSTOMER_REPOSITORY } from './interfaces/customer.repository.interface';
import { CUSTOMER_SERVICE } from './interfaces/customer.service.interface';
import { CustomerProfileController } from './controllers/customer-profile.controller';

@Module({
  providers: [
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
    {
      provide: CUSTOMER_SERVICE,
      useClass: CustomerService,
    },
  ],
  controllers: [CustomerController, CustomerProfileController],
  exports: [CUSTOMER_SERVICE, CUSTOMER_REPOSITORY],
})
export class CustomerModule {}
