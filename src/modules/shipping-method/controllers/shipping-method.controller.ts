// src/modules/shipping-method/controllers/shipping-method.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Inject,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { IShippingMethodService, SHIPPING_METHOD_SERVICE } from '../interfaces/shipping-method.service.interface';
import { CreateShippingMethodDto, ShippingMethodDto, UpdateShippingMethodDto } from '../dtos/shipping-method.dto';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('store/:storeId/shipping-methods')
@UseGuards(JwtAuthGuardUser)
export class ShippingMethodController {
  constructor(
    @Inject(SHIPPING_METHOD_SERVICE)
    private readonly shippingMethodService: IShippingMethodService,
  ) {}

  @Get()
  async findAll(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Query() query: QueryDto,
    @AuthUser() user: User,
  ): Promise<ShippingMethodDto[]> {
    const shippingMethods = await this.shippingMethodService.findAll(storeId, query);
    return shippingMethods.map((method) => new ShippingMethodDto(method));
  }

  @Get(':id')
  async findOne(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<ShippingMethodDto> {
    const shippingMethod = await this.shippingMethodService.findById(id);
    if (shippingMethod.storeId !== storeId) {
      throw new ForbiddenException('Access denied');
    }
    return new ShippingMethodDto(shippingMethod);
  }

  @Post()
  async create(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() createShippingMethodDto: CreateShippingMethodDto,
    @AuthUser() user: User,
  ): Promise<ShippingMethodDto> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const shippingMethod = await this.shippingMethodService.create(storeId, createShippingMethodDto);
    return new ShippingMethodDto(shippingMethod);
  }

  @Put(':id')
  async update(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateShippingMethodDto: UpdateShippingMethodDto,
    @AuthUser() user: User,
  ): Promise<ShippingMethodDto> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const shippingMethod = await this.shippingMethodService.update(id, updateShippingMethodDto);
    if (shippingMethod.storeId !== storeId) {
      throw new ForbiddenException('Access denied');
    }
    return new ShippingMethodDto(shippingMethod);
  }

  @Delete(':id')
  async delete(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const shippingMethod = await this.shippingMethodService.findById(id);
    if (shippingMethod.storeId !== storeId) {
      throw new ForbiddenException('Access denied');
    }
    await this.shippingMethodService.delete(id);
    return { message: 'ShippingMethod deleted successfully' };
  }
}
