import { CartDto } from '../dtos/cart.dto';
import { QueryDto } from '../../../common/dtos/query.dto';

export const CART_SERVICE = Symbol('ICartService');

export interface ICartService {
  findAll(query: QueryDto): Promise<CartDto[]>;
  findByCustomerId(customerId: string): Promise<CartDto>;
  addItem(customerId: string, productId: string, quantity: number): Promise<CartDto>;
  updateItem(customerId: string, cartItemId: string, quantity: number): Promise<CartDto>;
  removeItem(customerId: string, cartItemId: string): Promise<CartDto>;
  clearCart(customerId: string): Promise<void>;
}
