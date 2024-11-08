// src/modules/store-settings/controllers/store-settings.controller.ts
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
import { IStoreSettingsService, STORE_SETTINGS_SERVICE } from '../interfaces/store-settings.service.interface';
import { CreateStoreSettingsDto, StoreSettingsDto, UpdateStoreSettingsDto } from '../dtos/store-settings.dto';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('store/:storeId/settings')
@UseGuards(JwtAuthGuardUser)
export class StoreSettingsController {
  constructor(
    @Inject(STORE_SETTINGS_SERVICE)
    private readonly storeSettingsService: IStoreSettingsService,
  ) {}

  @Get()
  async findAll(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Query() query: QueryDto,
    @AuthUser() user: User,
  ): Promise<StoreSettingsDto> {
    // Verificação opcional: garantir que o usuário tenha acesso à store
    const storeSettings = await this.storeSettingsService.findByStoreId(storeId);
    return new StoreSettingsDto(storeSettings);
  }

  @Post()
  async create(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() createStoreSettingsDto: CreateStoreSettingsDto,
    @AuthUser() user: User,
  ): Promise<StoreSettingsDto> {
    // Verifique se o usuário é ADMIN ou ADMIN_OWNER
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const storeSettings = await this.storeSettingsService.create(storeId, createStoreSettingsDto);
    return new StoreSettingsDto(storeSettings);
  }

  @Put()
  async update(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() updateStoreSettingsDto: UpdateStoreSettingsDto,
    @AuthUser() user: User,
  ): Promise<StoreSettingsDto> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const updatedSettings = await this.storeSettingsService.update(storeId, updateStoreSettingsDto);
    return new StoreSettingsDto(updatedSettings);
  }

  @Delete()
  async delete(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    await this.storeSettingsService.delete(storeId);
    return { message: 'StoreSettings deleted successfully' };
  }
}
