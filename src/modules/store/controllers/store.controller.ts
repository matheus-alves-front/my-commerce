// src/modules/store/controllers/store.controller.ts

import { Controller, Post, Body, Get, Param, UseGuards, Inject } from '@nestjs/common';
import { STORE_SERVICE, IStoreService } from '../interfaces/store.service.interface';
import { CreateStoreDto } from '../dtos/store.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('stores')
export class StoreController {
  constructor(@Inject(STORE_SERVICE) private readonly storeService: IStoreService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @AuthUser() user: User
  ) {
    return this.storeService.create(user, createStoreDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

  // Outros endpoints
}
