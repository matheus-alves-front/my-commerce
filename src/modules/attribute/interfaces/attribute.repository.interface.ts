import { Attribute, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const ATTRIBUTE_REPOSITORY = Symbol('IAttributeRepository');

export interface IAttributeRepository {
  findAll(query: QueryDto): Promise<Attribute[]>;
  findById(id: string): Promise<Attribute | null>;
  create(data: Prisma.AttributeCreateInput): Promise<Attribute>;
  update(id: string, data: Prisma.AttributeUpdateInput): Promise<Attribute>;
  delete(id: string): Promise<void>;
}
