import { Address, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const CUSTOMER_ADDRESS_REPOSITORY = Symbol('ICustomerAddressRepository');

export interface ICustomerAddressRepository {
  findAll(customerId: string, query: QueryDto): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  create(data: Prisma.AddressCreateInput): Promise<Address>;
  update(id: string, data: Prisma.AddressUpdateInput): Promise<Address>;
  delete(id: string): Promise<void>;
}
