import { Cart, CartItem } from '@prisma/client';

export class CreateCartDto {
  // Não é necessário passar o customerId no body, pois ele virá do parâmetro da rota
}

export class UpdateCartDto {
  // Atualizações diretas no Cart geralmente não são necessárias, já que gerenciamos os CartItems
}

export class CartItemDto {
  id: string;
  productId: string;
  quantity: number;
  addedAt: Date;

  constructor(cartItem: CartItem) {
    this.id = cartItem.id;
    this.productId = cartItem.productId;
    this.quantity = cartItem.quantity;
    this.addedAt = cartItem.addedAt;
  }
}

export class CartDto {
  id: string;
  customerId: string;
  cartItems: CartItemDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(cart: Cart & { cartItems: CartItem[] }) {
    this.id = cart.id;
    this.customerId = cart.customerId;
    this.cartItems = cart.cartItems.map(item => new CartItemDto(item));
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }
}
