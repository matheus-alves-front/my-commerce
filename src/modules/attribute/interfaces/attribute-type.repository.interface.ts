import { AttributeType, Prisma } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';

export const ATTRIBUTE_TYPE_REPOSITORY = Symbol('IAttributeTypeRepository');

export interface IAttributeTypeRepository {
  findAll(query: QueryDto): Promise<AttributeType[]>;
  findById(id: string): Promise<AttributeType | null>;
  create(data: Prisma.AttributeTypeCreateInput): Promise<AttributeType>;
  update(id: string, data: Prisma.AttributeTypeUpdateInput): Promise<AttributeType>;
  delete(id: string): Promise<void>;
}
