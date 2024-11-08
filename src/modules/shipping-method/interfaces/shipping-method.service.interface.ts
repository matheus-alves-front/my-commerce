import { ShippingMethod } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateShippingMethodDto, UpdateShippingMethodDto } from '../dtos/shipping-method.dto';

export const SHIPPING_METHOD_SERVICE = Symbol('IShippingMethodService');

export interface IShippingMethodService {
  findAll(storeId: string, query: QueryDto): Promise<ShippingMethod[]>;
  findById(id: string): Promise<ShippingMethod>;
  create(storeId: string, createShippingMethodDto: CreateShippingMethodDto): Promise<ShippingMethod>;
  update(id: string, updateShippingMethodDto: UpdateShippingMethodDto): Promise<ShippingMethod>;
  delete(id: string): Promise<void>;
}
