// src/modules/product/controllers/product.controller.ts
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
import { IProductService, PRODUCT_SERVICE } from '../interfaces/product.service.interface';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dtos/product.dto';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('products')
@UseGuards(JwtAuthGuardUser)
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: IProductService) {}

  @Get()
  async findAll(@Query() query: QueryDto): Promise<ProductDto[]> {
    const products = await this.productService.findAll(query);
    return products.map((product) => new ProductDto(product));
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<ProductDto> {
    const product = await this.productService.findById(id);
    return new ProductDto(product);
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @AuthUser() user: User,
  ): Promise<ProductDto> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const newProduct = await this.productService.create(createProductDto);
    return new ProductDto(newProduct);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @AuthUser() user: User,
  ): Promise<ProductDto> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    const updatedProduct = await this.productService.update(id, updateProductDto);
    return new ProductDto(updatedProduct);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN' && user.role !== 'ADMIN_OWNER') {
      throw new ForbiddenException('Access denied');
    }
    await this.productService.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
