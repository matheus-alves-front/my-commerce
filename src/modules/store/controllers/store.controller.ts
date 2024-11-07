import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Get,
  Param,
  UseGuards,
  Inject,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { STORE_SERVICE, IStoreService } from '../interfaces/store.service.interface';
import { CreateStoreDto, UpdateStoreDto, StoreDto } from '../dtos/store.dto';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuardUser } from 'src/modules/auth/guards/jwt-user.guard';

@Controller('stores')
export class StoreController {
  constructor(@Inject(STORE_SERVICE) private readonly storeService: IStoreService) {}

  @UseGuards(JwtAuthGuardUser)
  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @AuthUser() user: User,
  ): Promise<StoreDto> {
    const store = await this.storeService.create(user, createStoreDto);
    return new StoreDto(store);
  }

  @Get()
  async findAll(): Promise<StoreDto[]> {
    const stores = await this.storeService.findAll();
    return stores.map((store) => new StoreDto(store));
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<StoreDto> {
    const store = await this.storeService.findById(id);
    return new StoreDto(store);
  }

  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @AuthUser() user: User,
  ): Promise<StoreDto> {
    // Apenas o proprietário ou um ADMIN pode atualizar a loja
    const store = await this.storeService.update(user, id, updateStoreDto);
    return new StoreDto(store);
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    // Apenas o proprietário ou um ADMIN pode excluir a loja
    await this.storeService.delete(user, id);
    return { message: 'Store deleted successfully' };
  }
}
