import { ShippingMethod, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const SHIPPING_METHOD_REPOSITORY = Symbol('IShippingMethodRepository');

export interface IShippingMethodRepository {
  findAll(storeId: string, query: QueryDto): Promise<ShippingMethod[]>;
  findById(id: string): Promise<ShippingMethod | null>;
  create(data: Prisma.ShippingMethodCreateInput): Promise<ShippingMethod>;
  update(id: string, data: Prisma.ShippingMethodUpdateInput): Promise<ShippingMethod>;
  delete(id: string): Promise<void>;
}
