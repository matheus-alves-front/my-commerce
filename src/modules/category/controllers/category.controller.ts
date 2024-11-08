// src/modules/category/controllers/category.controller.ts
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
import { ICategoryService, CATEGORY_SERVICE } from '../interfaces/category.service.interface';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('store/:storeId/categories')
@UseGuards(JwtAuthGuardUser)
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private readonly categoryService: ICategoryService) {}

  @Get()
  async findAll(@Query() query: QueryDto): Promise<CategoryDto[]> {
    const categories = await this.categoryService.findAll(query);
    return categories.map((category) => new CategoryDto(category));
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User, 
  ): Promise<CategoryDto> {
    const category = await this.categoryService.findById(id);
    return new CategoryDto(category);
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Param('storeId') storeId: string,
    @AuthUser() user: User,
  ): Promise<CategoryDto> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const newCategory = await this.categoryService.create(storeId, createCategoryDto);
    return new CategoryDto(newCategory);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @AuthUser() user: User,
  ): Promise<CategoryDto> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const updatedCategory = await this.categoryService.update(id, updateCategoryDto);
    return new CategoryDto(updatedCategory);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    await this.categoryService.delete(id);
    return { message: 'Category deleted successfully' };
  }
}
