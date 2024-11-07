// src/modules/customer/controllers/customer.controller.ts

import { Controller, Post, Body, Get, Param, UseGuards, Inject } from '@nestjs/common';
import { CUSTOMER_SERVICE, ICustomerService } from '../interfaces/customer.service.interface';
import { CreateCustomerDto } from '../dtos/customer.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('customers')
export class CustomerController {
  constructor(@Inject(CUSTOMER_SERVICE) private readonly customerService: ICustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    // Implementar lógica de criação de cliente
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Implementar lógica de busca de cliente
  }

  // Outros endpoints
}
