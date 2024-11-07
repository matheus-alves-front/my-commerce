import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ICustomerService, CUSTOMER_SERVICE } from '../interfaces/customer.service.interface';
import { UpdateCustomerDto, CustomerDto } from '../dtos/customer.dto';
import { AuthCustomer } from 'src/common/decorators/auth-customer.decorator';
import { Customer } from '@prisma/client';
import { Inject } from '@nestjs/common';
import { JwtAuthGuardCustomer } from 'src/modules/auth/guards/jwt-customer.guard';

@Controller('profile')
export class CustomerProfileController {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customerService: ICustomerService,
  ) {}

  @UseGuards(JwtAuthGuardCustomer)
  @Get()
  async getProfile(@AuthCustomer() customer: Customer): Promise<CustomerDto> {
    return new CustomerDto(customer);
  }

  @UseGuards(JwtAuthGuardCustomer)
  @Put()
  async updateProfile(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @AuthCustomer() customer: Customer,
  ): Promise<CustomerDto> {
    const updatedCustomer = await this.customerService.update(customer.id, updateCustomerDto);
    return new CustomerDto(updatedCustomer);
  }
}
