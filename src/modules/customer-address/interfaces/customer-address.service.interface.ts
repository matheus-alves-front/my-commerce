import { Address } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/customer-address.dto';

export const CUSTOMER_ADDRESS_SERVICE = Symbol('ICustomerAddressService');

export interface ICustomerAddressService {
  findAll(customerId: string, query: QueryDto): Promise<Address[]>;
  findById(id: string): Promise<Address>;
  create(customerId: string, createAddressDto: CreateAddressDto): Promise<Address>;
  update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address>;
  delete(id: string): Promise<void>;
}
