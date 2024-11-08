import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICartService } from '../interfaces/cart.service.interface';
import { ICartRepository, CART_REPOSITORY } from '../interfaces/cart.repository.interface';
import { QueryDto } from '../../../common/dtos/query.dto';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { CartDto } from '../dtos/cart.dto';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: ICartRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(query: QueryDto): Promise<CartDto[]> {
    return this.cartRepository.findAll(query);
  }

  async findByCustomerId(customerId: string): Promise<CartDto> {
    const cart = await this.cartRepository.findByCustomerId(customerId);
    if (!cart) {
      throw new NotFoundException('Cart not found for the given customerId');
    }
    return cart;
  }

  async addItem(customerId: string, productId: string, quantity: number): Promise<CartDto> {
    const cart = await this.cartRepository.findByCustomerId(customerId);
    if (!cart) {
      // Cria um novo carrinho se não existir
      return this.cartRepository.create({
        cartItems: {
          create: {
            productId,
            quantity,
          },
        },
        customer: {
          connect: {
            id: customerId
          }
        }
      });
    }

    // Verifica se o item já existe no carrinho
    const existingItem = cart.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      // Atualiza a quantidade
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Adiciona um novo item
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    // Retorna o carrinho atualizado
    return this.cartRepository.findByCustomerId(customerId);
  }

  async updateItem(customerId: string, cartItemId: string, quantity: number): Promise<CartDto> {
    const cart = await this.cartRepository.findByCustomerId(customerId);
    if (!cart) {
      throw new NotFoundException('Cart not found for the given customerId');
    }

    const cartItem = cart.cartItems.find(item => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }

    if (quantity <= 0) {
      // Remove o item se a quantidade for zero ou negativa
      await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      // Atualiza a quantidade
      await this.prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
    }

    return this.cartRepository.findByCustomerId(customerId);
  }

  async removeItem(customerId: string, cartItemId: string): Promise<CartDto> {
    const cart = await this.cartRepository.findByCustomerId(customerId);
    if (!cart) {
      throw new NotFoundException('Cart not found for the given customerId');
    }

    const cartItem = cart.cartItems.find(item => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }

    await this.prisma.cartItem.delete({ where: { id: cartItemId } });

    // Retorna o carrinho atualizado
    return this.cartRepository.findByCustomerId(customerId);
  }

  async clearCart(customerId: string): Promise<void> {
    const cart = await this.cartRepository.findByCustomerId(customerId);
    if (!cart) {
      throw new NotFoundException('Cart not found for the given customerId');
    }

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
}
