// src/modules/cart/controllers/cart.controller.ts
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
import { ICartService, CART_SERVICE } from '../interfaces/cart.service.interface';
import { CartDto, CreateCartDto, UpdateCartDto, CartItemDto } from '../dtos/cart.dto';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('customer/:customerId/cart')
@UseGuards(JwtAuthGuardUser)
export class CartController {
  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
  ) {}

  @Get()
  async findAll(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Query() query: QueryDto,
    @AuthUser() user: User,
  ): Promise<CartDto> {
    // Verifica se o usuário está acessando seu próprio carrinho ou é ADMIN
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const cart = await this.cartService.findByCustomerId(customerId);
    return cart;
  }

  @Post('items')
  async addItem(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Body() body: { productId: string; quantity: number },
    @AuthUser() user: User,
  ): Promise<CartDto> {
    // Verifica se o usuário está acessando seu próprio carrinho ou é ADMIN
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const { productId, quantity } = body;
    const cart = await this.cartService.addItem(customerId, productId, quantity);
    return cart;
  }

  @Put('items/:cartItemId')
  async updateItem(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Param('cartItemId', new ParseUUIDPipe()) cartItemId: string,
    @Body() body: { quantity: number },
    @AuthUser() user: User,
  ): Promise<CartDto> {
    // Verifica se o usuário está acessando seu próprio carrinho ou é ADMIN
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const { quantity } = body;
    const cart = await this.cartService.updateItem(customerId, cartItemId, quantity);
    return cart;
  }

  @Delete('items/:cartItemId')
  async removeItem(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Param('cartItemId', new ParseUUIDPipe()) cartItemId: string,
    @AuthUser() user: User,
  ): Promise<CartDto> {
    // Verifica se o usuário está acessando seu próprio carrinho ou é ADMIN
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const cart = await this.cartService.removeItem(customerId, cartItemId);
    return cart;
  }

  @Delete()
  async clearCart(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    // Verifica se o usuário está acessando seu próprio carrinho ou é ADMIN
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    await this.cartService.clearCart(customerId);
    return { message: 'Cart cleared successfully' };
  }
}
