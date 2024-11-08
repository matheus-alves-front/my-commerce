import { Cart, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CartDto } from '../dtos/cart.dto';

export const CART_REPOSITORY = Symbol('ICartRepository');

export interface ICartRepository {
  findAll(query: QueryDto): Promise<CartDto[]>;
  findByCustomerId(customerId: string): Promise<CartDto | null>;
  create(data: Prisma.CartCreateInput): Promise<CartDto>;
  update(customerId: string, data: Prisma.CartUpdateInput): Promise<CartDto>;
  delete(customerId: string): Promise<void>;
}
