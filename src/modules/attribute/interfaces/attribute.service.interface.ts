import { Attribute } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';

export const ATTRIBUTE_SERVICE = Symbol('IAttributeService');

export interface IAttributeService {
  findAll(query: QueryDto): Promise<Attribute[]>;
  findById(id: string): Promise<Attribute>;
  create(createAttributeDto: CreateAttributeDto): Promise<Attribute>;
  update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<Attribute>;
  delete(id: string): Promise<void>;
}
