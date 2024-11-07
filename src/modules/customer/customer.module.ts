// src/modules/customer/customer.module.ts

import { Module } from '@nestjs/common';
import { CustomerRepository } from './database/customer.repository';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { CUSTOMER_REPOSITORY } from './interfaces/customer.repository.interface';
import { CUSTOMER_SERVICE } from './interfaces/customer.service.interface';

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
  controllers: [CustomerController],
  exports: [CUSTOMER_SERVICE, CUSTOMER_REPOSITORY],
})
export class CustomerModule {}
