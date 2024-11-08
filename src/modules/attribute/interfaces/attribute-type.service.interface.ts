import { AttributeType } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateAttributeTypeDto, UpdateAttributeTypeDto } from '../dtos/attribute-type.dto';

export const ATTRIBUTE_TYPE_SERVICE = Symbol('IAttributeTypeService');

export interface IAttributeTypeService {
  findAll(query: QueryDto): Promise<AttributeType[]>;
  findById(id: string): Promise<AttributeType>;
  create(createAttributeTypeDto: CreateAttributeTypeDto): Promise<AttributeType>;
  update(id: string, updateAttributeTypeDto: UpdateAttributeTypeDto): Promise<AttributeType>;
  delete(id: string): Promise<void>;
}
